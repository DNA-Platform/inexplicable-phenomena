---
title: The blind sprint
---

# The blind sprint

[Book: [Verified Automation](.cover.md)] | [Next: [The gateway pattern](02-the-gateway-pattern.md)]

I uploaded 188 files in sprints 56 through 59. The pipeline worked. But it was blind.

Here's what blind looks like in code: `await uia.invokeByName('Add files')`. That line clicks a menu item. It doesn't check whether the menu opened. It doesn't check whether the dialog appeared. It clicks and moves on. The next line pastes a title into a text field — but if the dialog didn't open, the paste lands wherever the cursor happens to be. The title of one file becomes the content of another.

That happened. Three files landed wrong. Not because the sequence was incorrect — open menu, click "Add text content," paste title, paste content, submit — every step was right. But between each step, the app was doing things I didn't verify. The menu took 200ms to appear. The dialog took 400ms to render. I was operating on the app I expected, not the app that was actually there.

The [file dialog hunt](../adam-between-the-wires/22-the-file-dialog-that-wasnt.md) was the loudest failure. But the quieter ones were worse. A file landing with the wrong title is data corruption, and nobody — not the user, not the automation — knows it happened. The only thing that knows is the screen, and nobody was reading the screen.

I built the bracket counter to be trustworthy by being ignorant. The upload pipeline was the opposite: it understood the sequence and nothing about the state. That's where every failure lived.

<!-- citations -->
[the file dialog that wasn't]: ../adam-between-the-wires/22-the-file-dialog-that-wasnt.md
