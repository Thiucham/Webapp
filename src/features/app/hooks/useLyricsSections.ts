const DETAIL_ORDER = [
  ["V1", "CH-"],
  ["CH", "V1-"],
  ["V2", "V2-"],
  ["V3", "V3-"],
  ["V4", "V4-"],
  ["V5", "V5-"],
  ["V6", "V6-"],
  ["V7", "V7-"],
  ["V8", "V8-"],
  ["V9", "V9-"],
  ["V10", "V10-"],
  ["V11", "V11-"],
] as const;

type Song = Record<string, unknown>;

export type LyricsSection = {
  key: string;
  text: string;
};

export default function useLyricsSections(song: Song): LyricsSection[] {
  return DETAIL_ORDER
    .map(([first, second]) => {
      const key = song[first] ? first : song[second] ? second : null;

      if (!key) return null;

      return {
        key,
        text: String(song[key]),
      };
    })
    .filter((section): section is LyricsSection => section !== null);
}
