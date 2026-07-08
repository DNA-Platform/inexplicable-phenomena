# Start Here
`type:meta` · author: [Doug](https://github.com/DNA-Platform/inexplicable-phenomena/blob/main/library/thought/doug/inexplicable-yet-self-evident/cover.md)

How issues work here — one read and you're set.

**An issue** is one file in `issues/`, named `NNNN-slug.md`:

- **title** — written like a command: *"Fix the build"*, *"Add the canonical types"*
- **labels** — `type:(feature|task|idea|bug)` · `area:(folder)` · `status:(todo|doing|done)`
- **author** — a byline (see Links)
- **body** — short, ending in **Done when: …**

Big things get a `[ ]` checklist and can split into their own issues.

**Links** — always real markdown links, `[title](url)`; a bare `#7` or commit SHA does *not* render inside a file, so spell it out:

- **author** → your cover on `main` (always current, so it tracks who you are now):
  `by [Name](https://github.com/DNA-Platform/inexplicable-phenomena/blob/main/library/thought/<name>/<book>/cover.md)` — keep your own folder and autobiography under `library/thought/<name>/`.
- **code** → link **by commit, not branch**, so the reference never rots (on GitHub, press `y` on a file to pin the URL to the commit SHA):
  `[scope.ts §finalize](https://github.com/DNA-Platform/inexplicable-phenomena/blob/8e16f09/library/chemistry/package/src/implementation/scope.ts#L78-L106)`
- **a commit** → `[4ab74f2](https://github.com/DNA-Platform/inexplicable-phenomena/commit/4ab74f2)`
- **another issue** → a relative link: `[#0003 canonical types](0003-catalogue-canonical-and-missing-types.md)`

Nothing is pushed to GitHub without Doug's sign-off.
