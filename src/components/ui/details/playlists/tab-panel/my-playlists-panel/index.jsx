import React, { useState } from "react";

import { myPlaylist } from "@/constants/mockup-data/library";
import PlaylistCard from "@/components/ui/cards/playlist-card";
import SearchBox from "@/components/ui/search-box";


const MyPlaylistsPanel = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="py-1.5">
    <SearchBox keywordSetter={setSearchKeyword} />
    <div className="flex flex-col gap-[18px]">
      {myPlaylist
        .filter((item) =>
          item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        )
        .map((item, index) => (
          <PlaylistCard key={`playlist-card-${index}`} data={item} />
        ))}
    </div>
    </div>
  );
};

export default MyPlaylistsPanel;
