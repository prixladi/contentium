import { useEffect } from 'react';

const useCodeHighlights = () => {
  useEffect(() => {
    const Prism = require('prismjs');

    require('prismjs/components/prism-json.min');
    require('prismjs/components/prism-jsx.min');
    require('prismjs/components/prism-docker.min');
    require('prismjs/components/prism-csharp.min');
    require('prismjs/components/prism-go.min');
    require('prismjs/components/prism-java.min');
    Prism.highlightAll();
  }, []);
};

export { useCodeHighlights };
