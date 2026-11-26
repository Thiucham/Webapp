import { jsPDF } from "jspdf";

export interface SongHeader {
  ID?: number | string;
  Title?: string;
  Time?: string;
  Key?: string;
  Translation?: string;
}

export interface SongItem {
  header?: SongHeader;
  lyrics?: Record<string, string>;
  Category?: string;
}

const BASE_LIST_URL = "https://thiucham.github.io/Webapp/app/Hiuna-Khomlui/list";

function buildSongListUrl(songId?: number | string): string {
  if (songId === undefined || songId === null || songId === "") {
    return BASE_LIST_URL;
  }
  return `${BASE_LIST_URL}/${encodeURIComponent(String(songId))}`;
}

function drawPageFooter(
  doc: jsPDF,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  songId?: number | string
): void {
  const footerY = pageHeight - 12;
  const label = "More songs on Thiucham: ";
  const url = buildSongListUrl(songId);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(120);
  doc.text(label, margin, footerY);

  const labelWidth = doc.getTextWidth(label);
  doc.setTextColor(37, 99, 235);
  doc.textWithLink(url, margin + labelWidth, footerY, { url });
}

/**
 * Generates and downloads a PDF containing one or more songs.
 */
export function generateSongsPdf(songs: SongItem[]): void {
  if (!Array.isArray(songs) || songs.length === 0) {
    console.warn("generateSongsPdf: Expected a non-empty array of songs.");
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxTextWidth = pageWidth - margin * 2;
  const bottomLimit = pageHeight - 22;

  songs.forEach((song, songIndex) => {
    if (songIndex > 0) {
      doc.addPage();
    }

    let y = 20;
    const { header = {}, lyrics = {}, Category = "" } = song;
    const songId = header.ID;

    // 1. ID & Category
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`#${songId ?? ""}  |  Category: ${Category}`, margin, y);
    y += 10;

    // 2. Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0);
    const titleLines = doc.splitTextToSize(header.Title || "Untitled Song", maxTextWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 7 + 2;

    // 3. Translation
    if (header.Translation) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(12);
      doc.setTextColor(80);
      const transLines = doc.splitTextToSize(header.Translation, maxTextWidth);
      doc.text(transLines, margin, y);
      y += transLines.length * 6 + 3;
    }

    // 4. Time & Key
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(50);
    doc.text(`Time: ${header.Time || "-"}   |   Key: ${header.Key || "-"}`, margin, y);
    y += 6;

    // Divider line
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // 5. Verses
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(20);

    const verses = Object.values(lyrics);
    const lineHeight = 6;

    verses.forEach((verse) => {
      const lines = doc.splitTextToSize(String(verse), maxTextWidth);
      const blockHeight = lines.length * lineHeight;

      if (y + blockHeight > bottomLimit) {
        drawPageFooter(doc, pageWidth, pageHeight, margin, songId);
        doc.addPage();
        y = 20;
      }

      doc.text(lines, margin, y);
      y += blockHeight + 6;
    });

    drawPageFooter(doc, pageWidth, pageHeight, margin, songId);
  });

  const fileName =
    songs.length === 1
      ? `Song_${songs[0].header?.ID ?? "item"}_${(songs[0].header?.Title || "song")
          .replace(/[^a-z0-9]+/gi, "_")
          .replace(/^_|_$/g, "")}.pdf`
      : `Songs_${songs.map((s) => s.header?.ID).filter(Boolean).join("_") || "selection"}.pdf`;

  doc.save(fileName);
}
