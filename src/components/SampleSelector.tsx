import React, { useCallback, useState, useEffect } from 'react';

interface SampleSelectorProps {
  onSelectSample: (sampleContent: string) => void;
}

export default function SampleSelector({ onSelectSample }: SampleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const loadSample = useCallback(async (sampleName: string) => {
    try {
      const sampleContent = await fetch(`/api/samples/${sampleName}`)
        .then(res => res.text());
      onSelectSample(sampleContent);
      setIsOpen(false);
    } catch (error) {
      console.error(`Failed to load sample ${sampleName}:`, error);
    }
  }, [onSelectSample]);
  
  // Keyboard shortcuts handler for Ctrl+1/2/3
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl key is pressed
      if (event.ctrlKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            loadSample('intro.md');
            break;
          case '2':
            event.preventDefault();
            loadSample('features.md');
            break;
          case '3':
            event.preventDefault();
            loadSample('usage.md');
            break;
          default:
            break;
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loadSample]);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm font-medium dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md dark:hover:bg-slate-700"
      >
        Load Sample
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-38 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => loadSample('intro.md')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Introduction <span className="ml-2 opacity-70">(Ctrl+1)</span>
            </button>
            <button
              onClick={() => loadSample('features.md')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Features <span className="ml-2 opacity-70">(Ctrl+2)</span>
            </button>
            <button
              onClick={() => loadSample('usage.md')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Usage <span className="ml-2 opacity-70">(Ctrl+3)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}