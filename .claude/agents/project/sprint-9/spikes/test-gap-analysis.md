# Test Gap Analysis: Doug's App vs Our Suite

## Doug's test app categories

The `../chemistry` repo has a Next.js test app with four categories of visual tests. Each tests the framework through actual React rendering — real components, real DOM, real user interaction.

### Basics (basic-tests.tsx)
| Pattern | Doug tests it | We test it |
|---------|--------------|-----------|
| Basic `$` prop display | $Display with $text | $Element with $highlighted |
| State mutation + re-render | $Counter with increment() | NOT TESTED through React |
| @inert() decorator | $InertCounter with countInert | NOT TESTED |
| Multiple $ props | $MultiProp ($first, $second, $third) | NOT TESTED |
| Complex props (arrays, objects) | $ComplexProps | NOT TESTED |
| Getter/setter properties | $ComplexProps computedProp | NOT TESTED |

### Child Bonding (basic, arg, dynamic-arg, validation)
| Pattern | Doug tests it | We test it |
|---------|--------------|-----------|
| Binding constructor (basic) | $Book(...chapters) | $Water binding constructor (direct call only) |
| Mixed type children | $Document(title, chapters[], footer) | NOT TESTED |
| Polymorphic children | $FancyChapter extends $Chapter | NOT TESTED |
| Parent-child communication | $Article.addToAllSections | NOT TESTED |
| $Function wrapped children | $MixedContainer with SimpleCard | NOT TESTED |
| $Html intrinsic children | $FormBuilder with input/button/div | NOT TESTED |
| Include/Exclude structural | $Document with Include grouping | NOT TESTED |
| Constructor validation | $check in $ComplexValidator | $check unit tested, not in binding flow |
| Nested array children | $NestedContainer with groups | NOT TESTED |
| Optional parameters | $Book with optional cover | NOT TESTED |
| Context-aware rendering | $Chapter checks this.parent | NOT TESTED |
| Deep property access | $Catalogue computing stats from nested books | NOT TESTED |

### Reactions (member, sharing)
| Pattern | Doug tests it | We test it |
|---------|--------------|-----------|
| Catalyst correction (fields) | $FieldCatalystTest | NOT TESTED |
| Catalyst correction (getters) | $PropertyCatalystTest | NOT TESTED |
| Catalyst correction (methods) | $MethodCatalystTest | NOT TESTED |
| Prototypal sharing | $Card rendered twice with different props | NOT TESTED |
| Graph traversal | $GraphTraversalTest accessing nested chemicals | NOT TESTED |
| $is() parent type constraint | $DataChemical.$parent = $is($Chemical) | NOT TESTED |

### Async
| Pattern | Doug tests it | We test it |
|---------|--------------|-----------|
| Async onClick handler | $AsyncButton | NOT TESTED |
| Async in constructor | $AutoLoader | NOT TESTED |
| Multiple async methods | $MultiAsync step1/step2/step3 | NOT TESTED |
| Error handling in async | $ErrorHandler try/catch | NOT TESTED |
| Progressive loading | $ListLoader | NOT TESTED |
| Race conditions | $RaceCondition with requestId | NOT TESTED |
| $lookup module loading | $Dictionary with require.context | NOT TESTED |
| $load async module loading | AsyncLoadTest with Vite sim | NOT TESTED |

## Summary

Our 260 tests cover: particle identity, chemical construction, molecule/bond structure, reaction phases, lifecycle next(), catalogue, reflection, and basic element/compound examples.

Doug's app covers: real React rendering, re-render triggering, decorator annotations, complex child binding through the orchestrator, prototypal sharing, catalyst correction, async method handling, and module loading.

**The critical gap is rendering.** Our smoke test renders hydrogen but doesn't test re-renders. Doug's app tests that clicking a button triggers increment() which triggers a re-render which shows the new count. That's the core reactive loop — and it's the thing the diffing refactor changes.

## Recommendation for sprint 10

The diffing refactor tests should be written AGAINST Doug's patterns, not against ours. The $Counter that re-renders on increment. The $Card that shares state across renderings. The $Book that receives typed children through JSX. These are the acceptance criteria.
