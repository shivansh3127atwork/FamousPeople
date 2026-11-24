# 🌍 Famous People of the Day

A website that shows a random famous person every time you visit or click "Next Person".

## ✏️ How to Add / Remove People

**Only edit `data.js`** — that's the only file you ever need to touch!

```js
// data.js
const PEOPLE = [
  {
    name:  "Your Person's Name",
    field: "Their Field",
    known: "What they're known for",
    years: "YYYY – YYYY",
    emoji: "🌟",
    fact:  "An interesting fact about them."
  },
  // add more here...
];
```

The site automatically picks randomly from however many people you add.  
- **2 people?** → shows those 2 randomly  
- **100 people?** → shows any of those 100 randomly  
- **No hardcoding** in `app.js` — it always reads from `data.js`

## CI/CD

Powered by **SimpleCI**. Every push triggers a pipeline that:
1. Checks all 4 files exist (`index.html`, `style.css`, `app.js`, `data.js`)
2. Validates `data.js` has at least 1 person
3. Checks `const PEOPLE` array exists
4. Runs JS syntax check on both `data.js` and `app.js`
5. Verifies HTML links both scripts

## Run Locally

Just open `index.html` in a browser — no build step, no server needed.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `→` | Next person |
| `C` | Copy to clipboard |
