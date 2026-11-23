import { AllCollectionsLoader } from "./AllCollectionsLoader";

export async function CollectionLoader({
  params: { collection },
}: {
  params: { collection?: string };
}) {
  if (!collection) {
    return await AllCollectionsLoader();
  }

  const response = await fetch(
    `${import.meta.env.BASE_URL}data/${collection}.json`
  );

  if (!response.ok) {
    throw new Response("Collection not found", {
      status: 404,
    });
  }

  return {
    collection,
    songs: await response.json(),
  };
}
