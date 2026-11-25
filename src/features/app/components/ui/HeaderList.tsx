import { useState } from "react";
import type { SongHeader } from "~/features/app/loaders/CollectionsLoader";
import List from "./List";

type HeaderListProps = {
  groups?: Record<string, SongHeader[]>;
};

export default function HeaderList({ groups = {} }: HeaderListProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(group: string) {
    setOpenGroup((current) => (current === group ? null : group));
  }

  return (
    <main>
      {Object.entries(groups).map(([group, headers]) => {
        const isOpen = openGroup === group;

        return (
          <section key={group}>
            <div onClick={() => toggleGroup(group)}>
              <h3 style={{ paddingLeft: "1rem" }}>
                {group} ({headers.length})
              </h3>
            </div>

            {isOpen && <List headers={headers} />}
          </section>
        );
      })}
    </main>
  );
}
