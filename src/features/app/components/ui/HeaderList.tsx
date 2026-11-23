import { useState } from "react";

import List from "./List.tsx";

export default function HeaderList({
  groups = {},
}) {
  const [openGroup, setOpenGroup] = useState(null);

  function toggleGroup(group) {
    setOpenGroup((current) =>
      current === group ? null : group
    );
  }

  return (
    <main>
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
                <h3 style={{ paddingLeft: "1rem" }}>
                  {group} ({songs.length})
                </h3>
              </div>

              {isOpen && (
                <List
                  songs={songs}
                  collection={collection}
                />
              )}
            </section>
          );
        }
      )}
    </main>
  );
}
