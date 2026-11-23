export async function AllCollectionsLoader() {
  const collections = [
    "Luisan",
    "Khristen-Madui-Lui",
    "Hiuna-Khomlui",
  ];

  const songs = {};

  for (const collection of collections) {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/${collection}.json`
    );

    if (!response.ok) {
      throw new Response("Failed to load collections", {
        status: 404,
      });
    }

    const data = await response.json();

    songs[collection] = data;
  }

  return {
    collection: null,
    songs
    };
}
