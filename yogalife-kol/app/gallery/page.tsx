import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { HomeNavigation } from "@/components/home-navigation";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";
import "../home.css";
import "../cta.css";
import "../footer.css";
import "../gallery.css";

export const metadata: Metadata = {
  title: "Gallery | Moments from Yogalife Kolkata",
  description:
    "Photos from yoga classes, workshops and community gatherings at Yogalife Kolkata.",
};

// Photos live in public/images/gallery/<YYYY-MM-DD>/, one folder per day.
const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");

function getAlbums() {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  return fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse() // newest day first
    .map((date) => ({
      date,
      photos: fs
        .readdirSync(path.join(GALLERY_DIR, date))
        .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
        .sort(),
    }))
    .filter((album) => album.photos.length > 0);
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Gallery() {
  const albums = getAlbums();

  return (
    <div className="home-page" id="top">
      <HomeNavigation current="gallery" />
      <main id="main">
        <section className="section gallery-hero" aria-labelledby="gallery-title">
          <div className="container">
            <p className="eyebrow">Gallery</p>
            <h1 id="gallery-title">Moments from our yoga community</h1>
          </div>
        </section>

        {albums.map((album) => {
          const label = formatDate(album.date);
          return (
            <section
              key={album.date}
              className="section gallery-album"
              aria-labelledby={"album-" + album.date}
            >
              <div className="container">
                <div className="section-intro">
                  <h2 id={"album-" + album.date}>{label}</h2>
                  <p className="muted">{album.photos.length} photos</p>
                </div>
                <ul className="gallery-grid">
                  {album.photos.map((file, index) => (
                    <li key={file} className="gallery-item">
                      <Image
                        src={`/images/gallery/${album.date}/${encodeURIComponent(file)}`}
                        alt={`Yogalife Kolkata, ${label}, photo ${index + 1}`}
                        fill
                        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                        unoptimized // already compressed to ~10 KB
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
