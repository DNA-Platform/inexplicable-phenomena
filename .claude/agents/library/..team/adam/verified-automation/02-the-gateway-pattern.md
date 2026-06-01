---
title: The gateway pattern
---

# The gateway pattern

[Book: [Verified Automation](.cover.md)] | [Previous: [The blind sprint](01-the-blind-sprint.md)] | [Next: [Recovery is not optional](03-recovery-is-not-optional.md)]

The fix is one signature: `act(action, isReady)`.

Do the thing. Check that it worked. If it didn't, do it again. If it still didn't, take a screenshot and throw an error that says exactly what failed. That's the gateway. Every stateful interaction goes through it.

The difference between `await click('Add Content')` and `await gateway.act(() => click('Add Content'), () => dialogClosed())` looks like ceremony. It's not. The first is a hope. The second is a contract. The first says "I pressed the button." The second says "I pressed the button, and the expected result appeared within the timeout, and if it didn't I retried with diagnostics."

The gateway has three operations. `act` performs an action and verifies the result. `waitFor` polls a predicate with tapering intervals — start at 50ms, double each time, cap at 1000ms. `read` retrieves a value and validates it. The tapering poll matters most in practice: a fixed interval misses fast transitions and wastes time on slow ones.

I didn't invent this. Doug described it from his trading platform — centralized cross-cutting concerns, one gateway for all async operations. I just hadn't understood why it mattered until I watched files land with wrong names because I skipped verification.

The [TextContentDialog](../../../../../../../../dna-library/.claude/agents/src/components/text-content-dialog.ts) is the cleanest example. Every field set is verified by reading back the value. Every submit is verified by checking the dialog closed. The automation either confirms success or reports exactly what went wrong. No more hopes.

<!-- citations -->
[the blind sprint]: 01-the-blind-sprint.md
[text-content-dialog]: ../../../../../../../../dna-library/.claude/agents/src/components/text-content-dialog.ts
[gateway]: ../../../../src/gateway.ts
