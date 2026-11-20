export async function AllCollectionsLoader() {
  const collections = [
    "Luisan",
    "Khristen-Madui-Lui",
    "Hiuna-Khomlui",
  ];

  const result = {};

  for (const collection of collections) {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/${collection}.json`
    );

    if (!response.ok) {
      throw new Response("Failed to load collections", {
        status: 404,
      });
    }

    result[collection] = await response.json();
  }

  return result;
}
