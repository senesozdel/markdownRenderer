import React, { useEffect, useState } from 'react';

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  
  //  import the markdown parser
  useEffect(() => {
    let isMounted = true;
    
    const loadParserAndRender = async () => {
      try {
        // imports for the markdown parser
        const { unified } = await import('unified');
        const remarkParse = (await import('remark-parse')).default;
        const remarkRehype = (await import('remark-rehype')).default;
        const rehypeStringify = (await import('rehype-stringify')).default;
        const rehypeSanitize = (await import('rehype-sanitize')).default;
        
        // Create the processor
        const processor = unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeSanitize)
          .use(rehypeStringify);
        
        // Process the markdown to HTML
        const result = await processor.process(markdown);
        
        if (isMounted) {
          setHtml(String(result));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error parsing markdown:', error);
        if (isMounted) {
          setHtml('<p>Error parsing markdown</p>');
          setLoading(false);
        }
      }
    };
    
    loadParserAndRender();
    
    return () => {
      isMounted = false;
    };
  }, [markdown]);
  
  return (
    <div className="w-full h-full flex flex-col  dark:bg-gray-900 transition-colors duration-200">
      <div className=" dark:bg-gray-800 px-4 py-2 text-sm font-medium border-b border-gray-200 dark:border-gray-700 dark:text-gray-100 transition-colors duration-200">
        Preview
      </div>
      <div className="w-full h-full overflow-auto p-4  dark:bg-gray-900 transition-colors duration-200">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 dark:text-gray-400">Loading preview...</p>
          </div>
        ) : (
          <div 
            className=" max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}