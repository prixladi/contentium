import React, { FC } from 'react';
import ScrollToTop from 'react-scroll-up';

const Content: FC = ({ children }) => (
  <div className="content">
    {children}
    <ScrollToTop showUnder={200}>
      <span>☝️☝️☝️</span>
    </ScrollToTop>
  </div>
);

export default Content;
