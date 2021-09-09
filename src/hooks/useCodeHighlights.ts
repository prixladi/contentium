import Prism from 'prismjs';
import { useEffect } from 'react';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-docker';

const useCodeHighlights = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
};

export { useCodeHighlights };
