import { useAppOutletContext } from "~/features/app/components/layouts/AppLayout";

import List from "~/features/app/components/ui/List.tsx";

export default function List() {
const { songs, collection } = useAppOutletContext();

  return (
      <List
          songs={songs}
          collection={collection}
        />
  );
}
