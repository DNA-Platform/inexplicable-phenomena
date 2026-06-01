---
title: Recovery is not optional
---

# Recovery is not optional

[Book: [Verified Automation](.cover.md)] | [Previous: [The gateway pattern](02-the-gateway-pattern.md)]

The gateway tells me when an action failed. Recovery tells me what to do about it.

`resetToHome()` can get back to known good state from anywhere. Open dialog? Escape, verify it closed. Stale menu? Escape, verify it dismissed. Settings page? Click "Back to Claude," verify the URL changed. Text content dialog? Cancel, verify it closed. Whatever half-finished action left the app in some in-between screen, `resetToHome` walks it back through verified steps.

That function didn't exist in sprint 56. The upload script would hit a dialog timing issue, the dialog wouldn't open, the next paste would land in the wrong place, and the script would keep going — piling errors on errors because it had no way to say "something is wrong, start over." One missed dialog became three corrupted files.

The principle is simple: if you can't get back to known good state, you can't automate. A human user who sees the wrong dialog just closes it and tries again. An automation script that can't do the same is less capable than the human it replaces.

Recovery means detection first. The navigator reads the UIA tree for open dialogs, stale menus, overlay windows. It reads the URL for the active screen. Then it works backward: close what's open, escape what's blocking, navigate home, verify arrival. Each step through the gateway. Each step confirmed.

I used to think recovery was an edge case — something for a catch block. Sprints 56-60 taught me it's the foundation. The gateway verifies each step. Recovery survives when verification fails. Together they make the difference between automation that works once and automation that works 188 times in a row.

<!-- citations -->
[the gateway pattern]: 02-the-gateway-pattern.md
[navigator]: ../../../../src/navigator.ts
