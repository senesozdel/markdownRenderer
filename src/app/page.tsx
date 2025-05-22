'use client';

import { useEffect, useState, useCallback } from 'react';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import SampleSelector from '../components/SampleSelector';
import ThemeToggle from '../components/ThemeToggle';
import { useDocuments } from '../hooks/useIndexedDB';

export default function Home() {
  const { currentDocument, saveDocument, isLoading } = useDocuments();
  const [markdown, setMarkdown] = useState('');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Load initial content from IndexedDB
  useEffect(() => {
    if (!isLoading) { 
      if (currentDocument) {
        setMarkdown(currentDocument);
        setInitialLoadComplete(true);
      } else {
        // If no document is saved, load the intro sample
        const loadIntroSample = async () => {
          try {
            const sampleContent = await fetch('/api/samples/intro.md').then(res => res.text());
            setMarkdown(sampleContent);
            setInitialLoadComplete(true);
          } catch (error) {
            console.error('Failed to load intro sample:', error);
            setMarkdown('# Welcome to the Markdown Playground\n\nStart typing to see the preview.');
            setInitialLoadComplete(true);
          }
        };
      
        loadIntroSample();
      }
    }
  }, [currentDocument, isLoading]);

  // Handle markdown content changes
  const handleMarkdownChange = useCallback((content: string) => {
    setMarkdown(content);
    saveDocument(content);
  }, [saveDocument]);

  // Handle sample selection
  const handleSelectSample = useCallback((sampleContent: string) => {
    setMarkdown(sampleContent);
    saveDocument(sampleContent);
  }, [saveDocument]);
  
  if (!initialLoadComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-800 dark:text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] transition-colors duration-200">
      <header className="header p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Mark🔻down | HTML🔺up</h1>
          <div className="flex items-center space-x-4">
            <SampleSelector onSelectSample={handleSelectSample} />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] gap-4">
          <div className="w-full md:w-1/2 h-1/2 md:h-full editor-container rounded-lg overflow-hidden shadow-sm">
            <Editor initialValue={markdown} onChange={handleMarkdownChange} />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full preview-container rounded-lg overflow-hidden shadow-sm">
            <Preview markdown={markdown} />
          </div>
        </div>
      </main>
    </div>
  );
}