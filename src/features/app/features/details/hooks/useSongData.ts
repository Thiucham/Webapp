import {
  useParams
} from "react-router";

import { useAppOutletContext }from "~/features/app/components/layouts/AppLayout";

export default function useSongData() {
  const { songId } = useParams();

  const { songs, collection } = useAppOutletContext();

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
