import React, { useCallback, useState, useEffect } from 'react';

interface EditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [value, setValue] = useState(initialValue);
  
  // Update local state when initialValue changes 
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);
  
  return (
    <div className="w-full h-full flex flex-col  dark:bg-gray-900 transition-colors duration-200">
      <div className=" dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b border-gray-200 dark:border-gray-700  dark:text-gray-100 transition-colors duration-200">
        Markdown Editor
      </div>
      <textarea
        className="w-full h-full p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-mono text-sm  dark:bg-gray-900  dark:text-gray-100 transition-colors duration-200"
        value={value}
        onChange={handleChange}
        placeholder="Write your markdown here..."
        spellCheck="false"
      />
    </div>
  );
}