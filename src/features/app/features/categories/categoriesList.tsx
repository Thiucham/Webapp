import { useRouteLoaderData, useParams } from "react-router";

import { loader } from "~features/app/components/layouts/AppLayout";

import HeaderList from "~/features/app/components/ui/HeaderList.tsx";

type CategoryGroups = {
  [category: string]: {
    songs: any[];
    collection: string | undefined;
  };
};

export default function CategoriesList() {
  const songs = useRouteLoaderData("app-layout");

  const { collection } = useParams();

  const grouped: CategoryGroups = {};

  songs.forEach((song) => {
    const category = song.Category || "Others";

    if (!grouped[category]) {
      grouped[category] = {
        songs: [],
        collection,
      };
    }

    grouped[category].songs.push(song);
  });

  return <HeaderList groups={grouped} />;
}
