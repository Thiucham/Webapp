import List from "~/features/app/components/ui/List.tsx";
import type { Song } from "~/features/app/loaders/CollectionsLoader.ts";

type AllListProps = {
  songs: Song[];
  collection: string;
};

export default function AllList({ songs }: AllListProps) {
  const headers = songs.map((song) => song.Header);

  return <List headers={headers} />;
}
