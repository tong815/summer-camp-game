# Game Design Idea: Interactive Matrix + State Transition Rules

## One sentence

> **Game = a grid of tiles + each tile's state + rules that change states and resources**

---

## AI Civilization Village

In this project, you are not just playing a farm game.

You are building a **small civilization** that grows toward the **AI Age**.

- The **map** is a matrix (5 rows × 5 columns)
- Each **tile** stores a state: empty, farm, school, lab, …
- Each **turn**, rules run: buildings produce resources
- Your **goal** is to reach enough Knowledge to win

This is the same core model as many strategy and simulation games — kept simple for learning.

---

## What is the matrix?

Think of the map as a table:

```
⬜ ⬜ 🌾 ⬜ ⬜
⬜ 🏫 ⬜ ⬜ 🌲
⬜ ⬜ ⬜ ⛏️ ⬜
⬜ 🏠 ⬜ ⬜ ⬜
⬜ ⬜ 🧪 ⬜ ⬜
```

Each cell has one **state** (a building id like `"farm"` or `"empty"`).

In code, this is a 2D array stored in `systems/grid.js`.

---

## What are state transition rules?

Rules answer: **"When X happens, what changes?"**

Examples in this game:

| Event                    | Rule                                      |
|--------------------------|-------------------------------------------|
| Click empty tile + build | Spend resources → tile becomes a building |
| Click Next Turn          | Each building adds resources (produces)     |
| Knowledge reaches 10     | Quest complete → you win                  |

Building-specific rules live in **`data/buildings.js`**:

```javascript
produces: {
  food: 2,
}
```

`systems/production.js` reads these fields — it does **not** hard-code "farm gives food."

---

## Why data-driven design?

Students should be able to:

- Add a **new building** by editing `data/buildings.js`
- Change **costs and production** without touching complex logic
- Describe changes in plain language to AI

Example student request:

> "Add a Library that costs 2 wood and 1 gold and produces 1 knowledge."

That is mostly a **configuration change**, not a rewrite of the whole game.

---

## Turn-based loop

```
Select building → Click tile → Build (if affordable)
        ↓
   Next Turn
        ↓
Each tile's building produces resources
        ↓
Quest checks progress → UI updates
```

This loop is easy to test, easy to explain, and easy to extend.

---

## Ideas for extensions

Still using matrix + rules, you could add:

- New resources (energy, population)
- Buildings that need neighbors to work
- Random events ("storm removes 1 wood")
- Bigger map (6×6, 8×8)
- Multiple win conditions

Always write the rule in **plain language first**, then ask AI to update the right file.

---

## Your role vs AI's role

| You (student)              | AI (assistant)                |
|----------------------------|-------------------------------|
| Design the rule            | Write the code                |
| Say what should happen     | Find the right file to edit   |
| Test in the browser        | Fix errors you report         |
| Decide if it feels fun     | Keep code readable            |

You are the **designer and tester**. AI is the **coding helper**.
