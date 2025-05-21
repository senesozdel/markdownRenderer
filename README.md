## 📄 Overview
This is a **client‑only**, single‑page application where users write Markdown in an editor and view a live HTML preview. No servers or backend code—everything runs in the browser.

---

## 🎯 Objectives
1. **Real‑time Markdown Rendering**  
   - On each keystroke, converts `.md` to sanitized HTML and displays in preview pane.  
   - Ensure minimal latency and efficient reconciliation.

2. **Theme Toggle**  
   - Offers light/dark styles via Tailwind’s `dark:` variants.  


## 🧰 Tech Stack & Key Patterns
1. **React + TypeScript (v18+)**

2. **Dexie.js**
   - Defined DB schema as:
     ```js
     const db = new Dexie('MarkdownPlayground');
     db.version(1).stores({
       settings: '&key, value',
       documents: 'id, content'
     });
     ```
3. **Tailwind CSS**

4. **Security & Performance**
   - It sanitizes rendered HTML (e.g., `rehype-sanitize`).  

5. **IndexedDB Persistence**
   - Custom hook for saving/loading settings & documents.  


