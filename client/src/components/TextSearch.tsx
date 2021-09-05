import { FC, useState } from 'react';
import React from 'react';

type Props = {
  searchChanged: (search: string | null) => void;
  count: number;
  autosearchTresholdCount: number;
};

const TextSearch: FC<Props> = ({ searchChanged, count, autosearchTresholdCount }) => {
  const [search, setSearch] = useState(null as string | null);

  return (
    <div className=" flex items-center rounded-full">
      <input
        className="rounded-l-full w-full py-4 px-6 leading-tight focus:outline-none dark:bg-gray-700 bg-gray-300"
        id="search"
        type="text"
        placeholder="Search by title, author and keywords ..."
        onChange={(x) => {
          setSearch(x.target.value);
          if (count <= autosearchTresholdCount) {
            searchChanged(x.target.value);
          }
        }}
      />

      <div className="p-4">
        <button
          className="bg-blue-500 rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
          onClick={() => searchChanged(search)}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default TextSearch;
