import { useAppData } from "~/features/app/components/layouts/AppLayout";
import List from "~/features/app/components/ui/List.tsx";

export default function AllList() {
  const { songs, collection } = useAppData();

  console.log("AllList debug:", { collection, keys: Object.keys(songs), count: songs[collection]?.length });

  const headers = (songs[collection] ?? []).map((song) => song.Header);


  return <List headers={headers} />;
}
