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
    <div className="text-search-wrapper">
      <input
        className="text-search-input"
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

      <div className="text-search-button-wrapper">
        <button
          className="text-search-button"
          onClick={() => searchChanged(search)}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default TextSearch;
