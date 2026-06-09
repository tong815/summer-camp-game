# Module Division

This project works best with **5–6 students**, each owning one area.

Talk to your team before editing someone else's files.

---

## Overview

| # | Team                  | Main files                              | Responsibility                          |
|---|-----------------------|-----------------------------------------|-----------------------------------------|
| 1 | Grid & Map            | `systems/grid.js`                       | 5×5 map, tile states, rendering, clicks |
| 2 | Building              | `data/buildings.js`, `systems/buildings.js` | Building defs, select & place buildings |
| 3 | Resource              | `systems/resources.js`, `data/config.js` | Resource amounts, costs, starting values |
| 4 | Production Rules      | `systems/production.js`                 | What happens each turn                  |
| 5 | Quest & Progress      | `systems/quest.js`                      | Win condition, progress tracking        |
| 6 | UI / Text / Art       | `systems/ui.js`, `style.css`, `index.html` | Layout, buttons, colors, messages   |

**Team lead** (optional): maintains `main.js` — coordinate before changing it.

---

## 1. Grid & Map Team

**Files:** `systems/grid.js`

**You own:**

- Creating the 5×5 tile matrix
- Storing each tile's building id (`empty`, `farm`, …)
- Drawing the map on screen
- Sending tile clicks to `CampGame.onTileClick`

**Example tasks:**

- Change map to 6×6 (also update `data/config.js`)
- Show tile coordinates (row, col)
- Highlight empty tiles when a building is selected

**Do not change:** building costs or production (Building / Production teams)

---

## 2. Building Team

**Files:** `data/buildings.js`, `systems/buildings.js`

**You own:**

- What buildings exist (name, icon, color, description)
- Build costs (`cost: { wood: 2 }`)
- Production per turn (`produces: { food: 2 }`)
- Build menu list (`CampGame.buildMenuIds`)
- Logic for selecting and placing buildings

**Example tasks:**

- Add a new building (Market, Temple, Workshop)
- Change Farm cost from 2 wood to 3 wood
- Add a building that costs knowledge to build

**This is the main file for content additions.** Most student ideas start here.

---

## 3. Resource Team

**Files:** `systems/resources.js`, `data/config.js` (resource section)

**You own:**

- Starting resources (food, wood, stone, knowledge, gold)
- Adding and spending resources
- Checking if player can afford something

**Example tasks:**

- Start with more wood
- Add a new resource type (energy)
- Show resource icons in the bar (with UI team)

---

## 4. Production Rule Team

**Files:** `systems/production.js`

**You own:**

- What happens when player clicks **Next Turn**
- Reading each building's `produces` field and applying it

**Important:** Do **not** hard-code "farm gives food" here. Read from `data/buildings.js`.

**Example tasks:**

- Show a detailed production log
- Skip production for empty tiles (already handled)
- Add a rule: "Lab only produces if you also have a School on the map" (advanced)

---

## 5. Quest & Progress Team

**Files:** `systems/quest.js`, `data/config.js` (quest section)

**You own:**

- Win condition (default: 10 knowledge)
- Progress text ("3 / 10 knowledge")
- Detecting when player wins

**Example tasks:**

- Win by building 3 schools instead
- Add a second goal (reach 20 gold AND 10 knowledge)
- Change victory message

---

## 6. UI / Text / Art Team

**Files:** `systems/ui.js`, `style.css`, `index.html`

**You own:**

- Page layout and colors
- Resource bar, build menu, message area
- Next Turn and Reset buttons
- Win banner and subtitles

**Example tasks:**

- Dark mode theme
- Bigger grid cells on mobile
- Tooltips on build buttons

**Note:** UI **displays** data; it does not calculate resources (Resource team does that).

---

## How systems connect

```
Player picks building (UI → buildings.js)
        ↓
Player clicks tile (grid.js → main.js → buildings.js)
        ↓
Resources spent (resources.js), tile updated (grid.js)
        ↓
Player clicks Next Turn (main.js → production.js)
        ↓
Resources added (resources.js), quest checked (quest.js)
        ↓
UI refreshes (ui.js)
```

---

## Who to ask for what

| I want to…                    | Ask team…        |
|-------------------------------|------------------|
| Add a new building type       | Building         |
| Change starting gold          | Resource         |
| Change what happens each turn | Production Rules |
| Change win condition          | Quest & Progress |
| Make the page look better     | UI / Art         |
| Make the map bigger           | Grid & Map + Resource (config) |

---

## First team meeting checklist

1. Each person picks one team from the table
2. Agree: message the group before editing another team's file
3. Pick one group goal (example: "Add a Market and a new win condition")
4. Split that goal into small tasks — one per team

Good luck building your civilization 🏛️
