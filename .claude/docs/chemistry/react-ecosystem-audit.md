---
kind: report
title: React ecosystem integration audit — where $Chemistry meets friction
status: draft
---

# React Ecosystem Integration Audit

## The frame

Doug's analogy: raw React is to $Chemistry as `unsafe` is to C#. You can always drop into React function components, hooks, and the full React API. $Chemistry wraps React; it doesn't replace it. But some React-ecosystem libraries rely on patterns that don't map cleanly to chemicals. This audit catalogs where friction occurs and whether wrappers are needed.

## Category 1: Libraries that work seamlessly (no friction)

These libraries export React components. A chemical renders them in `view()`. No adaptation needed.

### styled-components
- **Integration:** `view()` renders styled atoms directly. Theme accessed via `(p) => p.theme.X`.
- **Status:** ✅ Used throughout the Lab app. Zero friction.

### react-router-dom
- **Integration:** `<Link to="...">` rendered in `view()`. `useParams()` and `useNavigate()` called in `view()` for route reading. Route setup at the app root via `createBrowserRouter`.
- **Status:** ✅ Used in the Lab app. The chemical reads route state via hooks in `view()` — legitimate composition.

### prism-react-renderer
- **Integration:** `<Highlight>` component rendered in `view()` with a render-prop pattern.
- **Status:** ✅ Used in the Lab app's code panel.

### Headless UI libraries (radix-ui, react-aria, headlessui)
- **Integration:** These export unstyled React components (`<Dialog>`, `<Popover>`, `<Combobox>`). A chemical renders them in `view()` and controls open/close state via reactive `$`-properties.
- **Status:** ✅ Expected to work. The chemical owns the state (`$open = false`); the library renders the DOM. No hooks needed in the chemical beyond what the library provides via render props.
- **Potential issue:** Some components use React context internally (e.g., `<Dialog.Root>` provides context for `<Dialog.Content>`). This works because the context lives inside the library's component tree, not in the chemical's scope.

### Icon libraries (lucide-react, react-icons, heroicons)
- **Integration:** Import an icon component, render in `view()`.
- **Status:** ✅ No friction.

### framer-motion
- **Integration:** `<motion.div>` rendered in `view()`. Animation variants controlled by reactive `$`-properties.
- **Status:** ✅ Expected to work. The `animate` prop reads the chemical's state on each render.

## Category 2: Libraries that need a thin bridge (minor friction)

These libraries expose hooks as their primary API. Hooks work inside `view()`, but they're React-specific patterns that don't map to $Chemistry's class-field model.

### react-query / TanStack Query
- **Primary API:** `useQuery()`, `useMutation()` — hooks.
- **In a chemical:** Call `useQuery()` inside `view()`:
  ```tsx
  view() {
      const { data, isLoading } = useQuery({ queryKey: ['items'], queryFn: fetchItems });
      if (isLoading) return <Spinner />;
      return <List items={data} />;
  }
  ```
- **Friction:** The hook runs on every render. Its return values (data, isLoading, error) are React state, not $Chemistry reactive properties. The chemical can't write to them or subscribe to them outside `view()`. This means the chemical can't trigger a refetch from a method — it has to go through the hook's `refetch` callback, which is only available inside `view()`.
- **Workaround:** Bridge the hook's state into reactive `$`-properties:
  ```tsx
  view() {
      const { data, isLoading } = useQuery({ queryKey: ['items'], queryFn: fetchItems });
      this.$data = data;       // sync into reactive field
      this.$loading = isLoading;
      return this.$loading ? <Spinner /> : <List items={this.$data} />;
  }
  ```
  This works but is awkward — the chemical reads from the hook then writes to its own fields, then reads its own fields for the view. The round-trip is noise.
- **Better pattern:** Use react-query in a function-component wrapper; pass the resolved data as a prop to the chemical:
  ```tsx
  function ItemsPage() {
      const { data, isLoading } = useQuery({ queryKey: ['items'], queryFn: fetchItems });
      if (isLoading) return <Spinner />;
      return <ItemList items={data} />;
  }
  ```
  The wrapper is the "unsafe" escape hatch — a function component using hooks at the boundary. The chemical below receives clean props.
- **Wrapper needed?** No formal wrapper. The pattern is: function component at the data-boundary calls the hook, chemical below it owns the UI. This is the same pattern as `LabRoute` calling `useParams()`.

### SWR
- Same pattern as react-query. Hook-based API, same bridge pattern.

### react-hook-form
- **Primary API:** `useForm()` — a hook that returns register/handleSubmit/errors.
- **Friction:** The entire form state (touched, dirty, validation errors) lives in the hook's return value. A chemical can't own this state because it's not `$`-reactive.
- **Better pattern:** For form state, $Chemistry already has a natural answer: reactive `$`-properties for each field, `$check` for validation. A `$Form` chemical with `$name`, `$email`, `$errors` etc. is simpler than `useForm()`.
- **Wrapper needed?** No. $Chemistry IS the form state manager. Reach for react-hook-form only if you need its specific features (schema validation via zod, field arrays, etc.) — and then use it in a function-component wrapper.

### react-spring / react-three-fiber
- Hook-based animation/3D APIs. Same bridge pattern: hook at the boundary, chemical below.

## Category 3: Libraries with deep React coupling (significant friction)

### Next.js / Remix / React Server Components
- **Issue:** These meta-frameworks control the render lifecycle. Server Components run on the server — they can't have class instances (no `new $Chemical()`). Client Components use hooks for data loading (`useLoaderData` in Remix).
- **$Chemistry's position:** Chemicals are client-only components. In a Next.js app, chemicals would be used in Client Components (files with `'use client'`). Server Components handle data fetching and layout; Client Components (chemicals) handle interactive UI.
- **Friction:** The `'use client'` boundary means chemicals can't participate in server-side rendering. But this is the same constraint as any stateful React component.
- **Wrapper needed?** No wrapper, but a clear boundary: chemicals live below the `'use client'` line. Server Components above it handle data fetching and pass props down.

### Redux / Zustand / Jotai / Recoil
- **Issue:** These provide global state management via hooks (`useSelector`, `useStore`, `useAtom`). Their state is outside React's tree — in a store.
- **Friction:** A chemical can call `useSelector()` in its `view()` to read store state, but it can't subscribe to store changes outside `view()`. If the store updates, React re-renders the component (the hook triggers it), and the chemical's `view()` runs again.
- **This is actually fine.** The store pushes updates via React's reconciliation, and the chemical responds. No wrapper needed. The chemical reads from the store in `view()` like any React component.
- **The $Chemistry alternative:** For per-chemical or per-subtree state, use reactive `$`-properties and the catalyst graph. For truly global state (auth, theme, feature flags), a store + hook-in-view is appropriate.

### React context (createContext + useContext)
- **Friction:** A chemical can consume context via `useContext()` in `view()`. A chemical can provide context by rendering `<MyContext.Provider value={...}>` in `view()`. Both work.
- **The gap:** A chemical can't declare itself as a context provider in the class definition — it has to render the provider JSX in `view()`. This is verbose but functional.
- **No wrapper needed.** Context just works — it's React's built-in DI mechanism, and chemicals participate in it normally.

## Summary: Where wrappers are needed

**Nowhere.** No formal wrapper API is needed for any common React library. The integration pattern is consistent:

1. **Library exports components?** → Render them in `view()`. Done.
2. **Library exposes hooks?** → Call hooks in `view()` for reading. For mutations/actions, expose via callbacks. If the hook is too chatty, use a function-component wrapper at the boundary.
3. **Library controls rendering (meta-frameworks)?** → Chemicals live below `'use client'`. Server components above.
4. **Library provides global state?** → Read via hooks in `view()`. Write via store APIs in methods.

The "unsafe" escape hatch is a function component using hooks — the same way C# lets you drop into `unsafe` blocks. It's not a failure; it's the designed boundary. $Chemistry wraps React's component model but doesn't replace React's hook model. When you need a hook, you use it — either directly in `view()` or in a thin function-component wrapper.

## Potential framework enhancement

**If we wanted to formalize the hook bridge**, we could add a `$use()` method to `$Chemical` that caches hook results across renders:

```tsx
class $Items extends $Chemical {
    view() {
        const { data } = this.$use(() => useQuery({ queryKey: ['items'], queryFn: fetch }));
        return <List items={data} />;
    }
}
```

This would let chemicals call hooks without the function-component wrapper. But it's sugar, not necessity — the wrapper pattern already works. Filing as a "nice to have" for a future sprint, not a blocker.

## Action items

1. Add a "Working with hooks" section to `for-component-authors.md` explaining the bridge pattern
2. Add a Lab test showing a chemical consuming a hook-based library (e.g., a timer using a hypothetical `useInterval` hook inside `view()`)
3. Consider the `$use()` enhancement for a future sprint
