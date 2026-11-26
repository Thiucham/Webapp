import type { Song, SongHeader } from "~/features/app/loaders/CollectionsLoader";
import HeaderList from "~/features/app/components/ui/HeaderList";

type CategoriesProps = {
  songs: Song[];
  collection: string;
};

export default function Categories({ songs }: CategoriesProps) {
  const grouped: Record<string, SongHeader[]> = {};

  for (const song of songs) {
    const category = song.Category || "Others";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(song.Header);
  }

  return <HeaderList groups={grouped} />;
}
