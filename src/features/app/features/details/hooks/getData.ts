import {
  useRouteLoaderData,
  useParams,
} from "react-router";

import type { loader } from "~features/app/components/layouts/AppLayout";

export default function useSongData() {
  const { collection, songId } = useParams();

  const songs = useRouteLoaderData<typeof loader>("app-layout");

  const index = songs?.findIndex(
    (song) => String(song.id) === songId
  ) ?? -1;

  const song = index !== -1 ? songs?.[index] : undefined;

  return {
    collection,
    songs,
    song,
    index,
  };
}
