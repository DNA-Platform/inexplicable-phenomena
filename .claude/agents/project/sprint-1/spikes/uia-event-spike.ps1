# uia-event-spike.ps1
# Spike: Use UI Automation events to detect content changes in Claude Desktop.
# UIA may work better than raw WinEvents for Electron/Chromium apps since
# Chromium implements IAccessible2/UIA providers in the renderer.
# Completely passive — does NOT focus or interact with the window.

param(
    [int]$TimeoutSeconds = 30
)

$ErrorActionPreference = 'Stop'

# --- Find Claude Desktop process ---
$claudeProcs = Get-Process -Name "claude" -ErrorAction SilentlyContinue |
    Where-Object { $_.Path -like '*WindowsApps*' }
if (-not $claudeProcs) {
    Write-Host "Claude Desktop is not running. Exiting."
    exit 1
}

$mainProc = $claudeProcs | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if (-not $mainProc) {
    Write-Host "No Claude Desktop window found. Exiting."
    exit 1
}

Write-Host "Claude Desktop PID: $($mainProc.Id), hwnd: 0x$($mainProc.MainWindowHandle.ToString('X8'))"
Write-Host "Monitoring UIA events for $TimeoutSeconds seconds..."
Write-Host ""

Add-Type -TypeDefinition @"
using System;
using System.Windows.Automation;
using System.Threading;
using System.Collections.Generic;
using System.Linq;

public class UIAEventSpike
{
    public static List<string> Log = new List<string>();
    public static Dictionary<string, int> EventCounts = new Dictionary<string, int>();

    public static void OnStructureChanged(object sender, StructureChangedEventArgs e)
    {
        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string change = e.StructureChangeType.ToString();
        string name = "";
        try { name = ((AutomationElement)sender).Current.Name; } catch { name = "?"; }
        string key = "StructureChanged:" + change;
        if (!EventCounts.ContainsKey(key)) EventCounts[key] = 0;
        EventCounts[key]++;

        string line = string.Format("{0}  STRUCTURE_CHANGED  type={1}  name={2}", ts, change, name);
        if (Log.Count < 200) { Log.Add(line); Console.WriteLine(line); }
    }

    public static void OnPropertyChanged(object sender, AutomationPropertyChangedEventArgs e)
    {
        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string prop = e.Property.ProgrammaticName;
        string oldVal = e.OldValue != null ? e.OldValue.ToString() : "null";
        string newVal = e.NewValue != null ? e.NewValue.ToString() : "null";
        string name = "";
        try { name = ((AutomationElement)sender).Current.Name; } catch { name = "?"; }

        string key = "PropertyChanged:" + prop;
        if (!EventCounts.ContainsKey(key)) EventCounts[key] = 0;
        EventCounts[key]++;

        // Truncate values for readability
        if (oldVal.Length > 80) oldVal = oldVal.Substring(0, 80) + "...";
        if (newVal.Length > 80) newVal = newVal.Substring(0, 80) + "...";
        if (name.Length > 50) name = name.Substring(0, 50) + "...";

        string line = string.Format("{0}  PROPERTY_CHANGED  prop={1}  name={2}  old={3}  new={4}",
            ts, prop, name, oldVal, newVal);
        if (Log.Count < 200) { Log.Add(line); Console.WriteLine(line); }
    }

    public static void OnTextChanged(object sender, AutomationEventArgs e)
    {
        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string name = "";
        try { name = ((AutomationElement)sender).Current.Name; } catch { name = "?"; }

        string key = "TextChanged";
        if (!EventCounts.ContainsKey(key)) EventCounts[key] = 0;
        EventCounts[key]++;

        string line = string.Format("{0}  TEXT_CHANGED  name={1}", ts, name);
        if (Log.Count < 200) { Log.Add(line); Console.WriteLine(line); }
    }

    public static void OnFocusChanged(object sender, AutomationFocusChangedEventArgs e)
    {
        string ts = DateTime.Now.ToString("HH:mm:ss.fff");
        string name = "";
        try { name = ((AutomationElement)sender).Current.Name; } catch { name = "?"; }

        string key = "FocusChanged";
        if (!EventCounts.ContainsKey(key)) EventCounts[key] = 0;
        EventCounts[key]++;

        string line = string.Format("{0}  FOCUS_CHANGED  name={1}", ts, name);
        if (Log.Count < 200) { Log.Add(line); Console.WriteLine(line); }
    }

    public static void Run(IntPtr hwnd, int timeoutSeconds)
    {
        AutomationElement root;
        try
        {
            root = AutomationElement.FromHandle(hwnd);
            Console.WriteLine("Found UIA element: {0} ({1})", root.Current.Name, root.Current.ClassName);
        }
        catch (Exception ex)
        {
            Console.WriteLine("ERROR: Could not get UIA element: {0}", ex.Message);
            return;
        }

        // Subscribe to structure changed events (new elements = new messages)
        Automation.AddStructureChangedEventHandler(
            root, TreeScope.Subtree,
            new StructureChangedEventHandler(OnStructureChanged));

        // Subscribe to property changes we care about
        Automation.AddAutomationPropertyChangedEventHandler(
            root, TreeScope.Subtree,
            new AutomationPropertyChangedEventHandler(OnPropertyChanged),
            AutomationElement.NameProperty,
            ValuePattern.ValueProperty,
            AutomationElement.BoundingRectangleProperty);

        // Subscribe to text changed
        Automation.AddAutomationEventHandler(
            TextPattern.TextChangedEvent,
            root, TreeScope.Subtree,
            new AutomationEventHandler(OnTextChanged));

        Console.WriteLine("UIA event handlers registered. Waiting {0}s...\n", timeoutSeconds);

        Thread.Sleep(timeoutSeconds * 1000);

        // Cleanup
        try { Automation.RemoveAllEventHandlers(); } catch { }

        Console.WriteLine("\n========================================");
        Console.WriteLine("RESULTS: {0} total events in {1}s", Log.Count, timeoutSeconds);
        Console.WriteLine("========================================\n");

        foreach (var kv in EventCounts.OrderByDescending(x => x.Value))
            Console.WriteLine("  {0,6}x  {1}", kv.Value, kv.Key);

        if (Log.Count == 0)
            Console.WriteLine("No UIA events detected. Electron may not fire UIA events for DOM changes.");
    }
}
"@ -ReferencedAssemblies UIAutomationClient, UIAutomationTypes

$hwnd = $mainProc.MainWindowHandle
[UIAEventSpike]::Run($hwnd, $TimeoutSeconds)
