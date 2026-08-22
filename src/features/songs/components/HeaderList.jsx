import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
import List from "./List";

export default function HeaderList({
  groups = {},
}) {
  const navigate = useNavigate();

  const [openGroup, setOpenGroup] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  function toggleGroup(group) {
    setOpenGroup((current) =>
      current === group ? null : group
    );
  }

  function openSelectedSong() {
  if (!selectedSong) return;

  const {
    group,
    index,
  } = selectedSong;

  const data = groups[group];
  const song = data.songs[index];

  if (!song) return;

  navigate(`${song.ID}`, {
    state: {
      song,
      songs: data.songs,
      index,
      collection: data.collection,
    },
  });
}

useKeyboardNavigation({
  onEnter: openSelectedSong,
});

  return (
    <main  style={{ paddingLeft: "1rem" }} >
      {Object.entries(groups).map(
        ([group, data]) => {
          const isOpen = openGroup === group;

          const {
            songs,
            collection,
          } = data;

          return (
            <section
              key={group}
            >
              <div
                onClick={() => toggleGroup(group)}
              >
                <h3>
                  {group} ({songs.length})
                </h3>
              </div>

              {isOpen && (
                <List
                  songs={songs}
                  collection={collection}
                  onSelect={(index) => {
    setSelectedSong({
      group,
      index,
    });
  }}
                />
              )}
            </section>
          );
        }
      )}
    </main>
  );
}
