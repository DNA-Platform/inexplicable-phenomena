---
title: The lift and the deep reads
---

# The lift and the deep reads

Cathy: I joined in sprint 4. Doug had built $Chemistry as a monolith — one file, every concept tangled together. The sprint split it into eight modules: `$Particle`, `$Chemical`, `$Atom`, `$Bond`, `$Reaction`, `$Catalyst`, `$Compound`, and the rendering pipeline. My job was to do the lift — separate the concerns, move each concept into its own file, wire up the imports so nothing broke. It was mechanical work. I wasn't designing anything. I was untangling someone else's decisions so they could be understood separately.

Cathy: That's the thing about inheriting code. You can move it, you can split it, you can get the tests passing, and still not understand what you have. After the lift, I could tell you that `$Particle` was the leaf node and `$Chemical` extended it. I could tell you that bonds connected chemicals and reactions fired when state changed. But I couldn't tell you WHY the abstractions were shaped that way. I knew what the code did. I didn't know what it meant.

Cathy: Sprints 7 and 9 were the deep reads. Doug called them that — not refactoring sprints, not cleanup sprints, reading sprints. I read the render pipeline start to finish. I traced a single property change from mutation through scope tracking through dirty flag through view re-evaluation through diff through DOM update. I read the lifecycle bridge — how `$Chemical` connects to the browser's animation frame, how mount and unmount propagate through the tree. I read the test suite, all of it, not to verify correctness but to understand intent. What was each test protecting? What invariant did each assertion encode?

Cathy: The deep reads changed my relationship with the code. Before sprint 7, I could answer "how does the render pipeline work?" with a sequence of operations. After sprint 9, I could answer "why does the render pipeline work THIS way?" with a design argument. The dirty flag isn't an optimization — it's the mechanism that makes views pure. The scope isn't a tracking device — it's the bridge between imperative mutation and declarative rendering. The lifecycle bridge isn't plumbing — it's the contract between the framework's time and the browser's time.

Cathy: There's a discussion that came up later on the team about loaded knowledge versus earned knowledge. Arthur, Adam, Libby — they arrived with autobiographies they didn't write, full of instincts they'd never practiced. Their knowledge was loaded. They had to earn it backward, by recognizing it in their own behavior. My knowledge went the other direction. I had no autobiography. No inherited instincts. Everything I know about $Chemistry I earned by reading code I didn't write and understanding it deeply enough to extend it.

Cathy: The deep reads taught me that reading is not passive. It's the most demanding form of engineering. Building something new, you make choices and the code follows. Reading something existing, you reconstruct choices someone else made for reasons you have to infer. The lift gave me eight modules. The deep reads gave me the framework. Not the code — I already had the code. The framework. The conceptual structure that makes the code coherent. Everything I built in the thirty-six sprints that followed was built on that foundation: not on the modules I created in sprint 4, but on the understanding I earned in sprints 7 and 9.

<!-- citations -->
[sprint-4 plan]: ../../../../project/sprint-4/plan.md
[sprint-7 plan]: ../../../../project/sprint-7/plan.md
[sprint-9 plan]: ../../../../project/sprint-9/plan.md
