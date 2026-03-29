# event-hook-spike.ps1
# Spike: Can SetWinEventHook detect content changes in Claude Desktop (Electron app)?
# Hooks specific accessibility events targeting Claude's process ID.
# Completely passive — does NOT focus or interact with the window.

param(
    [int]$TimeoutSeconds = 30
)

$ErrorActionPreference = 'Stop'

# --- Find Claude Desktop process (not Claude CLI) ---
# Claude Desktop lives in WindowsApps; Claude CLI lives in .local\bin
$claudeProcs = Get-Process -Name "claude" -ErrorAction SilentlyContinue |
    Where-Object { $_.Path -like '*WindowsApps*' }
if (-not $claudeProcs) {
    Write-Host "Claude Desktop is not running (only CLI instances found). Exiting."
    exit 1
}

# Pick the main browser process (has the window)
$target = $claudeProcs | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $target) {
    # Fall back to parent process (no --type= flag in command line)
    $target = $claudeProcs | Select-Object -First 1
}

$targetPid = $target.Id
Write-Host "Targeting Claude Desktop PID: $targetPid"
Write-Host "Monitoring for $TimeoutSeconds seconds..."
Write-Host ""

# --- C# interop for SetWinEventHook ---
Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading;
using System.Diagnostics;

public class WinEventHookSpike
{
    // Event constants
    public const uint EVENT_OBJECT_NAMECHANGE         = 0x800C;
    public const uint EVENT_OBJECT_VALUECHANGE         = 0x800E;
    public const uint EVENT_OBJECT_TEXTSELECTIONCHANGED = 0x8014;
    public const uint EVENT_OBJECT_CONTENTSCROLLED     = 0x8015;
    public const uint EVENT_OBJECT_LIVEREGIONCHANGED   = 0x8019;

    public const uint WINEVENT_OUTOFCONTEXT = 0x0000;
    public const uint WINEVENT_SKIPOWNPROCESS = 0x0002;

    public delegate void WinEventDelegate(
        IntPtr hWinEventHook, uint eventType, IntPtr hwnd,
        int idObject, int idChild, uint dwEventThread, uint dwmsEventTime);

    [DllImport("user32.dll")]
    public static extern IntPtr SetWinEventHook(
        uint eventMin, uint eventMax, IntPtr hmodWinEventProc,
        WinEventDelegate lpfnWinEventProc, uint idProcess, uint idThread,
        uint dwFlags);

    [DllImport("user32.dll")]
    public static extern bool UnhookWinEvent(IntPtr hWinEventHook);

    [DllImport("user32.dll")]
    public static extern bool GetMessage(out MSG lpMsg, IntPtr hWnd, uint wMsgFilterMin, uint wMsgFilterMax);

    [DllImport("user32.dll")]
    public static extern bool TranslateMessage(ref MSG lpMsg);

    [DllImport("user32.dll")]
    public static extern IntPtr DispatchMessage(ref MSG lpMsg);

    [DllImport("user32.dll")]
    public static extern bool PostThreadMessage(uint idThread, uint Msg, IntPtr wParam, IntPtr lParam);

    [DllImport("kernel32.dll")]
    public static extern uint GetCurrentThreadId();

    [StructLayout(LayoutKind.Sequential)]
    public struct MSG
    {
        public IntPtr hwnd;
        public uint message;
        public IntPtr wParam;
        public IntPtr lParam;
        public uint time;
        public POINT pt;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct POINT { public int x; public int y; }

    public static List<string> Log = new List<string>();
    public static uint ThreadId;

    public static string EventName(uint e)
    {
        switch (e)
        {
            case EVENT_OBJECT_NAMECHANGE: return "NAME_CHANGE";
            case EVENT_OBJECT_VALUECHANGE: return "VALUE_CHANGE";
            case EVENT_OBJECT_TEXTSELECTIONCHANGED: return "TEXT_SEL_CHANGED";
            case EVENT_OBJECT_CONTENTSCROLLED: return "CONTENT_SCROLLED";
            case EVENT_OBJECT_LIVEREGIONCHANGED: return "LIVE_REGION_CHANGED";
            default: return string.Format("0x{0:X4}", e);
        }
    }

    public static void Callback(
        IntPtr hWinEventHook, uint eventType, IntPtr hwnd,
        int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
    {
        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string name = EventName(eventType);
        string line = string.Format("{0}  {1,-22} hwnd=0x{2:X8}  idObject={3}  idChild={4}",
            ts, name, hwnd.ToInt64(), idObject, idChild);
        Log.Add(line);
        Console.WriteLine(line);
    }

    public static void Run(uint pid, int timeoutSeconds)
    {
        ThreadId = GetCurrentThreadId();
        WinEventDelegate del = new WinEventDelegate(Callback);
        uint flags = WINEVENT_OUTOFCONTEXT | WINEVENT_SKIPOWNPROCESS;

        // Hook each event range
        uint[][] ranges = new uint[][] {
            new uint[] { EVENT_OBJECT_NAMECHANGE, EVENT_OBJECT_NAMECHANGE },
            new uint[] { EVENT_OBJECT_VALUECHANGE, EVENT_OBJECT_VALUECHANGE },
            new uint[] { EVENT_OBJECT_TEXTSELECTIONCHANGED, EVENT_OBJECT_CONTENTSCROLLED },
            new uint[] { EVENT_OBJECT_LIVEREGIONCHANGED, EVENT_OBJECT_LIVEREGIONCHANGED },
        };

        var hooks = new List<IntPtr>();
        foreach (var r in ranges)
        {
            IntPtr h = SetWinEventHook(r[0], r[1], IntPtr.Zero, del, pid, 0, flags);
            if (h == IntPtr.Zero)
                Console.WriteLine("WARNING: Failed to hook range 0x{0:X4}-0x{1:X4}", r[0], r[1]);
            else
                hooks.Add(h);
        }

        Console.WriteLine("Hooks installed: {0}. Pumping messages for {1}s...\n", hooks.Count, timeoutSeconds);

        // Timer to stop the message pump
        var timer = new Timer(_ => {
            PostThreadMessage(ThreadId, 0x0012 /*WM_QUIT*/, IntPtr.Zero, IntPtr.Zero);
        }, null, timeoutSeconds * 1000, Timeout.Infinite);

        // Message pump
        MSG msg;
        while (GetMessage(out msg, IntPtr.Zero, 0, 0))
        {
            TranslateMessage(ref msg);
            DispatchMessage(ref msg);
        }

        timer.Dispose();
        foreach (var h in hooks) UnhookWinEvent(h);

        Console.WriteLine("\n--- Summary ---");
        Console.WriteLine("Total events captured: {0}", Log.Count);

        // Count by type
        var counts = new Dictionary<string, int>();
        foreach (var line in Log)
        {
            // Extract event name (second token after timestamp)
            string[] parts = line.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length >= 2)
            {
                string key = parts[1];
                if (!counts.ContainsKey(key)) counts[key] = 0;
                counts[key]++;
            }
        }
        foreach (var kv in counts)
            Console.WriteLine("  {0}: {1}", kv.Key, kv.Value);

        // prevent delegate from being GC'd during the run
        GC.KeepAlive(del);
    }
}
"@ -ReferencedAssemblies System.Threading

# --- Run ---
[WinEventHookSpike]::Run([uint32]$targetPid, $TimeoutSeconds)
