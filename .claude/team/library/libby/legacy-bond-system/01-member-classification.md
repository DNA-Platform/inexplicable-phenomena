---
title: Member classification flags
---

# Member classification flags

The legacy `$Bond` carried explicit classification flags on every bonded member. These flags were set during construction and `form()`, and were readable via getters. The current port preserved some but dropped others.

## $Bond flags (field and property bonds)

| Flag | Type | Set where | Logic |
|------|------|-----------|-------|
| `isProp` | boolean | Constructor | `$Reflection.isSpecial(property)` — true for `$name` pattern |
| `isMethod` | boolean | Default false | Always false on $Bond; overridden to true in $Bonding |
| `isField` | derived | Getter | `!isProperty && !isMethod` |
| `isProperty` | derived | Getter | `getter !== undefined \|\| setter !== undefined` |
| `isReadable` | derived | Getter | `isField \|\| getter !== undefined` |
| `isWritable` | derived | Getter | `isField \|\| setter !== undefined` |
| `isReadOnly` | derived | Getter | `getter !== undefined && setter === undefined` |
| `isWriteOnly` | derived | Getter | `getter === undefined && setter !== undefined` |
| `isEditable` | derived | Getter | `isReadable && isWritable` |
| `isParent` | boolean | Default false | Only true on `$Parent` subclass |
| `isPure` | boolean | Default false | Only set on $Bonding (methods) |
| `isAsync` | boolean | Default false | Only set on $Bonding (methods) |

## $Bonding flags (method bonds)

`$Bonding` extends `$Bond`. In the constructor:

```
_isProp  = false          // methods are never props
_isMethod = true          // always
_isPure  = $Reflection.isSpecial(method)  // $name methods are pure
```

In `form()`:

```
_isAsync = this._action instanceof (async function(){}).constructor
```

Async detection works by comparing the method's constructor to `AsyncFunction`. This catches methods declared with `async` keyword. Methods that return promises without being declared async are detected later in `bondCall()` when the return value is `instanceof Promise`.

## $Reflection naming rules

These are identical in legacy and current code:

- `isSpecial(name)`: `$` + lowercase second char, not `$$` or `$_`. Min length 2.
- `isReactive(name)`: `constructor` is never reactive. `_prefix` is never reactive. Non-`$` names are reactive. `$name` names are reactive only if `isSpecial`.

The implication for member classification:

| Pattern | isReactive | isSpecial (isProp on fields, isPure on methods) |
|---------|-----------|--------------------------------------------------|
| `count` | yes | no |
| `$count` | yes | yes (prop if field, pure if method) |
| `$Count` | no | no (inert — capital after $) |
| `_count` | no | no (underscore prefix) |
| `$$count` | no | no (double dollar) |
| `$_count` | no | no (dollar-underscore) |

## Pure method caching in $Bonding

When `isPure` is true, `bondCall()` caches results by argument identity:

- Tracks an "arg symbol" — if same args, returns cached value
- For sync: caches in `_lastValue`
- For async: caches promise in `_lastSeenActive`

This means `$doSomething()` (special-named) was a memoized method in the legacy system.

## Async promise management in $Bonding

`handleAsync()` wraps returned promises:
- Stores as `_lastSeenActive` / `_lastSeenRender`
- Supports promise cancellation via `cancel()` action chaining
- Tracks whether a render happened during the promise
- Updates reactivity only if value changed on resolution

## $Molecule.formula() — state serialization

Iterates all bonds, skips methods, reads current value via getter or backing field, serializes to JSON via `$symbolize()`. Supports two closure modes:

- `'referential'`: keeps references to other chemicals
- `'self-contained'`: excludes chemical references

`$Molecule.read()` is the inverse — deserializes JSON back into bond state.
