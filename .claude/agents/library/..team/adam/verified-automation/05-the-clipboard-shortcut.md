---
title: The clipboard shortcut
---

# The clipboard shortcut

Adam: We spent an hour automating a Windows file dialog before Doug said "Skip the dialog if we don't need it."

Adam: The problem: attach a file to a Claude message. The obvious approach: click the attachment button, navigate the file dialog, select the file, click Open. The file dialog is a native Windows control — not part of the Electron app, not in the UIA tree we normally read, requiring its own window handle, its own timing, its own failure modes.

Adam: The solution: `SetFileDropList`. Put the file path on the clipboard as a file drop list — the same format Windows Explorer uses when you Ctrl+C a file. Then Ctrl+V into Claude's composer. The composer reads the file data from the clipboard path. Five lines of code.

```typescript
async attachFile(filePath: string): Promise<void> {
  const before = await this.readAttachments();
  await this.auto.keyboard.copyFileToClipboard(filePath);
  await this.focusComposer();
  await this.auto.keyboard.sendKeys('^v');
  await this.auto.gateway.waitFor(
    async () => (await this.readAttachments()).length > before.length,
  );
}
```

Adam: The gateway verification at the end matters. After pasting, we wait until the attachment count increases. No static delay. No "sleep 500ms and hope." The tree tells us when the file arrived.

Adam: The design principle: when the API offers a simpler path than the UI, take it. The clipboard isn't a hack — it's a lower-level interface that skips presentation-layer complexity. Routing around the file dialog with understanding isn't avoidance. It's engineering.

Adam: This is also how image attachment works. `SetImage` puts bitmap data on the clipboard. Ctrl+V pastes it as an image file. Same pattern, different clipboard format.

<!-- citations -->
[composed-message-controller]: ../../../../src/controllers/composed-message-controller.ts
[keyboard]: ../../../../src/keyboard.ts
[blind sprint]: 01-the-blind-sprint.md
