# AI Civilization Village

A browser-based civilization village game for **Grade 7 AI summer camp** students.

Students learn how to work with AI:

> **Describe needs → Split systems → Let AI implement → Test → Improve**

The core idea:

> **Game = Interactive Matrix + State Transition Rules**

---

## What is this?

You build a small village on a **5×5 grid**. Each tile holds a **state** (empty, farm, school, lab, …).

Each turn, buildings **produce resources** according to simple rules in `data/buildings.js`.

Your goal: grow **Knowledge** to 10 and reach the **AI Age**.

---

## How to run

1. Download or clone this project
2. **Double-click `index.html`** to open it in your browser
3. No npm, no server, no install needed

---

## Basic game loop

1. **Select a building** from the Build Menu (Farm, School, AI Lab, …)
2. **Click an empty tile** on the 5×5 map to build
3. The game checks if you have enough resources; if yes, it spends them and places the building
4. Click **Next Turn** — every building produces resources
5. Watch your resources and task progress
6. Win when you reach **10 Knowledge**
7. Click **Reset Game** to start over

---

## Starting resources

| Resource   | Amount |
|------------|--------|
| Food       | 5      |
| Wood       | 8      |
| Stone      | 5      |
| Knowledge  | 0      |
| Gold       | 3      |

---

## Buildings (default)

| Building | Cost           | Produces per turn   |
|----------|----------------|---------------------|
| Farm     | 2 wood         | +2 food             |
| House    | 2 wood, 1 stone| +1 gold             |
| School   | 3 wood, 1 stone| +1 knowledge        |
| Mine     | 2 wood         | +2 stone            |
| Forest   | 1 food         | +2 wood             |
| AI Lab   | 3 stone, 2 gold| +2 knowledge        |

---

## Project structure

```
summer-camp-game/
├── index.html
├── style.css
├── main.js                 # Start game, connect systems
├── data/
│   ├── config.js           # Grid size, starting resources, win goal
│   └── buildings.js        # Building definitions (ADD NEW BUILDINGS HERE)
├── systems/
│   ├── grid.js             # Map and tile clicks
│   ├── resources.js        # Food, wood, stone, knowledge, gold
│   ├── buildings.js        # Select and place buildings
│   ├── production.js       # Run production each turn
│   ├── quest.js            # Win condition
│   └── ui.js               # Page display
└── docs/
    ├── project-idea.md
    ├── student-workflow.md
    └── module-division.md
```

---

## How to add a new building (student-friendly)

Most new content goes in **`data/buildings.js`**. You usually do **not** need to change `production.js`.

**Example — add a Market:**

1. Open `data/buildings.js`
2. Add a new entry:

```javascript
market: {
  id: "market",
  name: "Market",
  icon: "🏪",
  color: "#fff9c4",
  description: "Trades food for gold.",
  cost: {
    wood: 2,
    stone: 2,
  },
  produces: {
    gold: 2,
  },
  buildable: true,
},
```

3. Add `"market"` to the `CampGame.buildMenuIds` list at the bottom of the same file
4. Save, refresh the browser, and test

Tell AI: *"I want to add a Market building that costs 2 wood and 2 stone and produces 2 gold. Please edit data/buildings.js only."*

---

## Student teams

See [docs/module-division.md](docs/module-division.md) for who owns which file.

| Team              | Main files                          |
|-------------------|-------------------------------------|
| Grid & Map        | `systems/grid.js`                   |
| Building          | `data/buildings.js`, `systems/buildings.js` |
| Resource          | `systems/resources.js`, `data/config.js` |
| Production Rules  | `systems/production.js`             |
| Quest & Progress  | `systems/quest.js`                  |
| UI / Text / Art   | `systems/ui.js`, `style.css`        |

---

## Working with AI

**Always describe what you want before asking AI to edit code.**

See [docs/student-workflow.md](docs/student-workflow.md) for the full 7-step workflow.

**Good prompt example:**

```
I work on data/buildings.js.
I want to add a Windmill that costs 3 wood and produces 1 food and 1 gold.
Please only edit buildings.js and tell me what you changed.
```

---

## Tech notes

- Plain HTML + CSS + JavaScript only
- Opens directly from `index.html`
- All modules connect through the global `CampGame` object
- Code is formatted with clear indentation for beginners

### Architecture (AI Civilization Village)

| File | Role |
|------|------|
| `main.js` | Initialize systems, wire buttons, handle build / next turn |
| `data/config.js` | Grid size, starting resources, win goal |
| `data/buildings.js` | Building costs and production rules |
| `systems/grid.js` | 5×5 tile map (`getTile` / `setTile`) |
| `systems/resources.js` | food, wood, stone, knowledge, gold |
| `systems/buildings.js` | Select and place buildings |
| `systems/production.js` | Read `produces` from building defs each turn |
| `systems/quest.js` | Track knowledge goal |
| `systems/ui.js` | Render UI only (no game logic) |

Old farming files (`growth.js`, `player.js`) have been removed. The game loop is:
**select building → click tile → Next Turn → production → check quest**.

---

## License

Free to use and modify for AI summer camp teaching.
