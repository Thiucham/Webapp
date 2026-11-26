export const COLLECTIONS = [
  "Luisan",
  "Khristen-Madui-Lui",
  "Hiuna-Khomlui",
] as const;

export type CollectionName = (typeof COLLECTIONS)[number];

export interface SongHeader {
  ID: number;
  Title: string;
  "Time signature": string;
  Key: string;
  Translation: string;
}

export interface SongLyrics {
  [verse: string]: string;
}

export interface Song {
  Header: SongHeader;
  Lyrics: SongLyrics;
  Category: string;
}

export type SongsByCollection = Record<string, Song[]>;

// Read from public/data/ during build-time prerendering (Node)
export async function loadCollectionsFromDisk(): Promise<{ songs: SongsByCollection }> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const entries = await Promise.all(
    COLLECTIONS.map(async (collection) => {
      const filePath = path.resolve(process.cwd(), "public/data", `${collection}.json`);
      const raw = await fs.readFile(filePath, "utf-8");
      return [collection, JSON.parse(raw)] as const;
    })
  );

  return {
    songs: Object.fromEntries(entries),
  };
}

// Fetch from public/data/ in the browser
export async function fetchCollectionsFromPublic(): Promise<{ songs: SongsByCollection }> {
  const baseUrl = import.meta.env.BASE_URL;

  const entries = await Promise.all(
    COLLECTIONS.map(async (collection) => {
      const response = await fetch(`${baseUrl}data/${collection}.json`);
      if (!response.ok) {
        throw new Response(`Failed to load collection: ${collection}`, {
          status: response.status || 404,
        });
      }
      const data = await response.json();
      return [collection, data] as const;
    })
  );

  return {
    songs: Object.fromEntries(entries),
  };
}
