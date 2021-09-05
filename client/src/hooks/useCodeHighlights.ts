import Prism from 'prismjs';
import { useEffect } from 'react';
require('prismjs/components/prism-jsx.min');

const useCodeHighlights = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
};

export { useCodeHighlights };
