import { useCallback, useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import Dexie from 'dexie';

// database schema
class MarkdownPlaygroundDB extends Dexie {
  settings!: Dexie.Table<{ key: string, value: any }, string>;
  documents!: Dexie.Table<{ id: string, content: string }, string>;

  constructor() {
    super('MarkdownPlayground');
    this.version(1).stores({
      settings: '&key, value',
      documents: 'id, content'
    });
  }
}

const db = new MarkdownPlaygroundDB();

export function useSettings() {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Sync next-themes theme 
  useEffect(() => {
    if (nextTheme === 'dark' || nextTheme === 'light') {
      setTheme(nextTheme);
    }
  }, [nextTheme]);

  // Load theme from IndexedDB 
  useEffect(() => {
    async function loadTheme() {
      try {
        const themeSetting = await db.settings.get('theme');
        if (themeSetting) {
          const savedTheme = themeSetting.value as 'light' | 'dark';
          setTheme(savedTheme);
          setNextTheme(savedTheme); 
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const defaultTheme = prefersDark ? 'dark' : 'light';
          setTheme(defaultTheme);
          setNextTheme(defaultTheme); 
          
          await db.settings.put({ key: 'theme', value: defaultTheme });
      }
    } catch (error) {
        console.error('Failed to load theme from IndexedDB:', error);
    }
}
    
    loadTheme();
  }, [setNextTheme]);
  
  // Save theme to IndexedDB when it changes
  const updateTheme = useCallback(async (newTheme: 'light' | 'dark') => {
    try {
      setTheme(newTheme);
      setNextTheme(newTheme); 
      await db.settings.put({ key: 'theme', value: newTheme });
    } catch (error) {
      console.error('Failed to save theme to IndexedDB:', error);
    }
  }, [setNextTheme]);
  
  return { theme, updateTheme };
}

export function useDocuments() {
  const [currentDocument, setCurrentDocument] = useState<string>('');
  
  // Load the last edited document from IndexedDB
  useEffect(() => {
    async function loadLastDocument() {
      try {
        const lastDoc = await db.documents.get('lastEdited');
        if (lastDoc) {
          setCurrentDocument(lastDoc.content);
        }
      } catch (error) {
        console.error('Failed to load document from IndexedDB:', error);
      }
    }
    
    loadLastDocument();
  }, []);
  
  // Save document content to IndexedDB
  const saveDocument = useCallback(async (content: string) => {
    try {
      setCurrentDocument(content);
      await db.documents.put({ id: 'lastEdited', content });
    } catch (error) {
      console.error('Failed to save document to IndexedDB:', error);
    }
  }, []);
  
  return { currentDocument, saveDocument };
}
