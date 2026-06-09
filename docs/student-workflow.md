# Student AI Collaboration Workflow

This guide is for **Grade 7 students** working on AI Civilization Village.

**Rule: describe what you want before asking AI to edit code.**

---

## Step 1: What do I want to do?

Write **one clear sentence**.

**Good examples:**

- "I want to add a Market building that produces gold."
- "I want the win condition to be 15 knowledge instead of 10."
- "I want the map to be 6×6."

**Bad examples:**

- "Fix my code." (too vague)
- "Make the game better." (no clear goal)

---

## Step 2: What is happening now?

Describe the **current** behavior.

**Examples:**

- "Right now there are 6 buildings in the menu. I want a 7th."
- "Right now Farm costs 2 wood. I want it to cost 3."
- "When I click Next Turn, School gives 1 knowledge."

Mention which file you work on.

---

## Step 3: What should happen after the change?

Describe the **expected result** clearly.

**Examples:**

- "After the change, the Build Menu shows a Market button."
- "After the change, building a Farm costs 3 wood."
- "After the change, winning requires 15 knowledge."

---

## Step 4: Send your request to AI

Use this template:

```
My team: Building Team
My file: data/buildings.js

What I want: Add a Market building.

Current behavior: There is no Market in the build menu.

Expected result:
- Market icon: 🏪
- Cost: 2 wood, 2 stone
- Produces: 2 gold per turn
- Shows in the build menu

Please only edit data/buildings.js and explain what you changed.
```

---

## Step 5: Copy the code

1. Open the file AI mentions
2. Find the right place
3. Paste or replace the code
4. **Save** (Ctrl + S)

If unsure where to paste, ask AI: "Which lines should I replace?"

---

## Step 6: Test

1. Go to the browser
2. Press **F5** to refresh (or reopen `index.html`)
3. Play through the new feature yourself

Checklist:

- [ ] Does the new feature work?
- [ ] Did anything else break?
- [ ] Do numbers and text look correct?
- [ ] Any red errors in the console (F12)?

---

## Step 7: Report errors to AI

If something fails, send:

1. A **screenshot** of the page
2. Any **error text** from the console (F12 → Console)
3. **What you clicked** before the problem

**Example:**

```
I added the Market building but it does not show in the menu.
No error in console.
I edited data/buildings.js and added "market" to buildMenuIds.
Please help me find the mistake.
```

Then go back to **Step 4** and try again.

---

## Tips for this project

- **Most new buildings** → edit `data/buildings.js` only
- **Starting resources or win goal** → edit `data/config.js`
- **How the page looks** → UI team edits `style.css` and `systems/ui.js`
- Tell your team before editing `main.js`

---

## Remember

> **You design and test. AI writes code.**

> **Say what you want first. Code second.**
