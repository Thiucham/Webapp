import { useAppData } from "~/features/app/components/layouts/AppLayout";
import type { SongHeader } from "~/features/app/loaders/CollectionsLoader";
import HeaderList from "~/features/app/components/ui/HeaderList";

export default function Categories() {
  const { songs, collection } = useAppData();

  const grouped: Record<string, SongHeader[]> = {};

  for (const song of songs[collection] ?? []) {
    const category = song.Category || "Others";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(song.Header);
  }

  return <HeaderList groups={grouped} />;
}
