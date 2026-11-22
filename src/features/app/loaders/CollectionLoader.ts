import { AllCollectionsLoader } from "./AllCollectionsLoader";

export async function CollectionLoader({
  params,
}: {
  params: { collection?: string };
}) {

  if (!params.collection) {
    return await AllCollectionsLoader();
  }

  const collection = params.collection;

  if (!collection) {
    throw new Response("Collection not found", {
      status: 404,
    });
  }

  const response = await fetch(
    `${import.meta.env.BASE_URL}data/${collection}.json`
  );

  if (!response.ok) {
    throw new Response("Collection not found", {
      status: 404,
    });
  }

  return response.json();
}
