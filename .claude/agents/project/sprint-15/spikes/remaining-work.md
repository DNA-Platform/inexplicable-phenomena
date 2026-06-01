# Sprint 15 — Remaining Work

## Done this sprint
- [x] Restored useState pattern for concurrent-mode-safe instance creation
- [x] Restored two-check unmount for strict mode
- [x] Added $rendering$ flag to prevent setState during render
- [x] Built $List exported as $ for auto-keying
- [x] Removed $use from book components — replaced with .$Component and <$>
- [x] Removed dead serialization from molecule and exports
- [x] Binding constructor validation verified
- [x] Deep read of old $Component$, $Bonding.bondCall, replaceIf
- [x] Deep read of old orchestrator render pipeline
- [x] Retrospective on port failures
- [x] React edge cases documented (strict mode, concurrent mode, setState timing)

## Still to do this sprint
- [ ] Update remaining book components (chapter, textbook) — agent working on this
- [ ] Deep read: old augmentView — understand key injection that we lost
- [ ] Deep read: old $Reaction.activate/deactivate — verify our $rendering$ flag covers all cases
- [ ] Deep read: old $Bond.replaceIf — design equivalent for diffing architecture
- [ ] Deep read: old $Chemical parent setter — catalyst system, verify our port is correct
- [ ] Deep read: old $Bonding.handleAsync — compare to our simplified async handling
- [ ] Test: strict mode double-mount lifecycle
- [ ] Test: bonded method called from computed getter in view (should NOT trigger $update$)
- [ ] Test: $List auto-keys children correctly
- [ ] Test: same chemical rendered twice with different props (multi-render)
- [ ] Update app to use <$> instead of $use
- [ ] Verify app works through Puppeteer screenshots

## Findings from deep read
- augmentView was the MECHANISM for prototypal scoping — we deleted the solution to multi-render
- Old code stored $update$ on REACTION, not CHEMICAL — multi-render worked because each mount had its own reaction
- Promise cancellation in handleAsync is a correctness issue for rapid async calls
- Effect deps: our effects fire every render vs old token-gated firing — semantic difference for next() resolution

## Deferred to next sprint
- [ ] $lift prototypal shadows — Object.create(particle) per mount for prop independence
- [ ] Broadcast $update$ — Set of update functions per chemical, one per mount
- [ ] replaceIf equivalent — catalyst correction for property assignments
- [ ] $Persistent — meaningful reform/reflect when persistence is real
- [ ] Comprehensive composition scenario tests (16 scenarios identified)
- [ ] Test audit against React contracts (not just our own logic)
- [ ] App: Phillip's three-column design with code viewer
- [ ] App: more book types (novel, textbook)
- [ ] App: comprehensive test list (18 tests)
- [ ] Catalogue DI integration
- [ ] Reflection integration
