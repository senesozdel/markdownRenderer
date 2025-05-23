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
   - The last document worked on is saved instantly. Thus, the user can access the last document even if he refreshes the page. (It is constantly saving the last file to the DB.)


##  How to Run
1. **Clone the repo**
   -git clone repoAdress
2. **Install dependencies**
   -npm install or yarn install
3. **Run the app** 
   -check the package.json file for the command to run the app
   -yarn next dev or npm run dev

## ScreenShots

1. **Dark Theme**
   - ![image](https://github.com/user-attachments/assets/88812927-1519-44f0-adb2-5c8445b1d8e6)

2. **HTML Codes on Console**
   - ![image](https://github.com/user-attachments/assets/9b52c38f-5207-413c-9ced-4f9226d68197)

3. **Light Theme**
   - ![image](https://github.com/user-attachments/assets/cc22d316-7ff5-429d-b15b-e08d26b295a5)



