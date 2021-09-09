import { FC } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { componentsMap } from '../markdown';
import React from 'react';

type Props = {
  content: MDXRemoteSerializeResult;
};

const Markdown: FC<Props> = ({ content }) => (
  <div className="markdown">
    <MDXRemote {...content} components={componentsMap} />
  </div>
);

export default Markdown;
