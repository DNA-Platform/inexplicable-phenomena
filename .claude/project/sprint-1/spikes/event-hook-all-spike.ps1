# event-hook-all-spike.ps1
# Spike: Hook ALL WinEvents (EVENT_MIN to EVENT_MAX) for Claude Desktop
# to discover which events are useful. Runs for 10 seconds.
# Completely passive — does NOT focus or interact with the window.

param(
    [int]$TimeoutSeconds = 10
)

$ErrorActionPreference = 'Stop'

# --- Find Claude Desktop process (not Claude CLI) ---
$claudeProcs = Get-Process -Name "claude" -ErrorAction SilentlyContinue |
    Where-Object { $_.Path -like '*WindowsApps*' }
if (-not $claudeProcs) {
    Write-Host "Claude Desktop is not running (only CLI instances found). Exiting."
    exit 1
}

$target = $claudeProcs | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $target) {
    $target = $claudeProcs | Select-Object -First 1
}

$targetPid = $target.Id

Write-Host "Claude Desktop processes:"
$claudeProcs | ForEach-Object {
    $type = if ($_.MainWindowHandle -ne 0) { "MAIN" } else { "child" }
    Write-Host "  PID $($_.Id) [$type]"
}
Write-Host "Targeting Claude Desktop PID: $targetPid"
Write-Host "Hooking ALL events (0x0001-0x7FFF) for $TimeoutSeconds seconds..."
Write-Host ""

Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading;
using System.Linq;

public class WinEventAllSpike
{
    public const uint EVENT_MIN = 0x00000001;
    public const uint EVENT_MAX = 0x7FFFFFFF;
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

    // Well-known event names for readability
    static Dictionary<uint, string> KnownEvents = new Dictionary<uint, string>
    {
        {0x0001, "EVENT_SYSTEM_SOUND"},
        {0x0002, "EVENT_SYSTEM_ALERT"},
        {0x0003, "EVENT_SYSTEM_FOREGROUND"},
        {0x0004, "EVENT_SYSTEM_MENUSTART"},
        {0x0005, "EVENT_SYSTEM_MENUEND"},
        {0x0006, "EVENT_SYSTEM_MENUPOPUPSTART"},
        {0x0007, "EVENT_SYSTEM_MENUPOPUPEND"},
        {0x0008, "EVENT_SYSTEM_CAPTURESTART"},
        {0x0009, "EVENT_SYSTEM_CAPTUREEND"},
        {0x000A, "EVENT_SYSTEM_MOVESIZESTART"},
        {0x000B, "EVENT_SYSTEM_MOVESIZEEND"},
        {0x000C, "EVENT_SYSTEM_CONTEXTHELPSTART"},
        {0x000D, "EVENT_SYSTEM_CONTEXTHELPEND"},
        {0x000E, "EVENT_SYSTEM_DRAGDROPSTART"},
        {0x000F, "EVENT_SYSTEM_DRAGDROPEND"},
        {0x0010, "EVENT_SYSTEM_DIALOGSTART"},
        {0x0011, "EVENT_SYSTEM_DIALOGEND"},
        {0x0012, "EVENT_SYSTEM_SCROLLINGSTART"},
        {0x0013, "EVENT_SYSTEM_SCROLLINGEND"},
        {0x0014, "EVENT_SYSTEM_SWITCHSTART"},
        {0x0015, "EVENT_SYSTEM_SWITCHEND"},
        {0x0016, "EVENT_SYSTEM_MINIMIZESTART"},
        {0x0017, "EVENT_SYSTEM_MINIMIZEEND"},
        {0x0018, "EVENT_SYSTEM_DESKTOPSWITCH"},
        {0x0020, "EVENT_OEM_DEFINED_START"},
        {0x00FF, "EVENT_OEM_DEFINED_END"},
        {0x4001, "EVENT_UIA_EVENTID_START"},
        {0x40FF, "EVENT_UIA_EVENTID_END"},
        {0x7500, "EVENT_UIA_PROPID_START"},
        {0x75FF, "EVENT_UIA_PROPID_END"},
        {0x8000, "EVENT_OBJECT_CREATE"},
        {0x8001, "EVENT_OBJECT_DESTROY"},
        {0x8002, "EVENT_OBJECT_SHOW"},
        {0x8003, "EVENT_OBJECT_HIDE"},
        {0x8004, "EVENT_OBJECT_REORDER"},
        {0x8005, "EVENT_OBJECT_FOCUS"},
        {0x8006, "EVENT_OBJECT_SELECTION"},
        {0x8007, "EVENT_OBJECT_SELECTIONADD"},
        {0x8008, "EVENT_OBJECT_SELECTIONREMOVE"},
        {0x8009, "EVENT_OBJECT_SELECTIONWITHIN"},
        {0x800A, "EVENT_OBJECT_STATECHANGE"},
        {0x800B, "EVENT_OBJECT_LOCATIONCHANGE"},
        {0x800C, "EVENT_OBJECT_NAMECHANGE"},
        {0x800D, "EVENT_OBJECT_DESCRIPTIONCHANGE"},
        {0x800E, "EVENT_OBJECT_VALUECHANGE"},
        {0x800F, "EVENT_OBJECT_PARENTCHANGE"},
        {0x8010, "EVENT_OBJECT_HELPCHANGE"},
        {0x8011, "EVENT_OBJECT_DEFACTIONCHANGE"},
        {0x8012, "EVENT_OBJECT_ACCELERATORCHANGE"},
        {0x8013, "EVENT_OBJECT_INVOKED"},
        {0x8014, "EVENT_OBJECT_TEXTSELECTIONCHANGED"},
        {0x8015, "EVENT_OBJECT_CONTENTSCROLLED"},
        {0x8016, "EVENT_SYSTEM_ARRANGMENTPREVIEW"},
        {0x8017, "EVENT_OBJECT_CLOAKED"},
        {0x8018, "EVENT_OBJECT_UNCLOAKED"},
        {0x8019, "EVENT_OBJECT_LIVEREGIONCHANGED"},
        {0x801A, "EVENT_OBJECT_HOSTEDOBJECTSINVALIDATED"},
        {0x801B, "EVENT_OBJECT_DRAGSTART"},
        {0x801C, "EVENT_OBJECT_DRAGCANCEL"},
        {0x801D, "EVENT_OBJECT_DRAGCOMPLETE"},
        {0x801E, "EVENT_OBJECT_DRAGENTER"},
        {0x801F, "EVENT_OBJECT_DRAGLEAVE"},
        {0x8020, "EVENT_OBJECT_DRAGDROPPED"},
        {0x8021, "EVENT_OBJECT_IME_SHOW"},
        {0x8022, "EVENT_OBJECT_IME_HIDE"},
        {0x8023, "EVENT_OBJECT_IME_CHANGE"},
        {0x8025, "EVENT_OBJECT_TEXTEDIT_CONVERSIONTARGETCHANGED"},
        {0x8028, "EVENT_OBJECT_END"},
    };

    public static Dictionary<uint, int> EventCounts = new Dictionary<uint, int>();
    public static List<string> RawLog = new List<string>();
    public static int TotalEvents = 0;
    public static uint ThreadId;

    public static string EventName(uint e)
    {
        if (KnownEvents.ContainsKey(e)) return KnownEvents[e];
        return string.Format("0x{0:X8}", e);
    }

    public static void Callback(
        IntPtr hWinEventHook, uint eventType, IntPtr hwnd,
        int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
    {
        TotalEvents++;
        if (!EventCounts.ContainsKey(eventType)) EventCounts[eventType] = 0;
        EventCounts[eventType]++;

        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string name = EventName(eventType);

        // Log first 200 events verbosely, then just count
        if (RawLog.Count < 200)
        {
            string line = string.Format("{0}  {1,-45} hwnd=0x{2:X8}  obj={3}  child={4}",
                ts, name, hwnd.ToInt64(), idObject, idChild);
            RawLog.Add(line);
            Console.WriteLine(line);
        }
        else if (TotalEvents % 100 == 0)
        {
            Console.WriteLine("... {0} events so far ...", TotalEvents);
        }
    }

    public static void Run(uint[] pids, int timeoutSeconds)
    {
        ThreadId = GetCurrentThreadId();
        WinEventDelegate del = new WinEventDelegate(Callback);
        uint flags = WINEVENT_OUTOFCONTEXT | WINEVENT_SKIPOWNPROCESS;

        var hooks = new List<IntPtr>();
        foreach (uint pid in pids)
        {
            IntPtr hook = SetWinEventHook(EVENT_MIN, EVENT_MAX, IntPtr.Zero, del, pid, 0, flags);
            if (hook == IntPtr.Zero)
                Console.WriteLine("WARNING: Hook failed for PID {0}", pid);
            else
            {
                hooks.Add(hook);
                Console.WriteLine("Hooked PID {0}", pid);
            }
        }

        if (hooks.Count == 0)
        {
            Console.WriteLine("ERROR: No hooks installed.");
            return;
        }

        Console.WriteLine("{0} hooks installed. Pumping messages for {1}s...\n", hooks.Count, timeoutSeconds);

        var timer = new Timer(_ => {
            PostThreadMessage(ThreadId, 0x0012, IntPtr.Zero, IntPtr.Zero);
        }, null, timeoutSeconds * 1000, Timeout.Infinite);

        MSG msg;
        while (GetMessage(out msg, IntPtr.Zero, 0, 0))
        {
            TranslateMessage(ref msg);
            DispatchMessage(ref msg);
        }

        timer.Dispose();
        foreach (var h in hooks) UnhookWinEvent(h);

        Console.WriteLine("\n========================================");
        Console.WriteLine("RESULTS: {0} events in {1} seconds", TotalEvents, timeoutSeconds);
        Console.WriteLine("========================================\n");
        Console.WriteLine("Events by type (sorted by count desc):\n");

        var sorted = EventCounts.OrderByDescending(kv => kv.Value).ToList();
        foreach (var kv in sorted)
        {
            Console.WriteLine("  {0,6}x  {1}", kv.Value, EventName(kv.Key));
        }

        Console.WriteLine("\nRate: ~{0:F1} events/sec", (double)TotalEvents / timeoutSeconds);

        GC.KeepAlive(del);
    }
}
"@ -ReferencedAssemblies System.Threading, System.Core

# Hook ALL Claude Desktop processes (Electron has main + renderer + GPU + utility processes)
$allPids = $claudeProcs | Select-Object -ExpandProperty Id
Write-Host "`nHooking $($allPids.Count) Claude Desktop processes..."
[WinEventAllSpike]::Run([uint32[]]$allPids, $TimeoutSeconds)
