"use client";

import Masonry from "react-masonry-css";
import { SmartImage, Text } from "@/once-ui/components";
import styles from "./Gallery.module.scss";

interface GalleryImage {
  src: string;
  alt: string;
  orientation: string;
}

interface MasonryGridProps {
  images: GalleryImage[];
  offset?: number;
}

export default function MasonryGrid({ images, offset = 0 }: MasonryGridProps) {
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {images.map((image, index) => (
        <article key={`${image.src}-${index}`} className={styles.gridItem}>
          <div className={styles.frame}>
            <SmartImage
              priority={index < 8}
              enlarge
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              radius="l"
              aspectRatio={image.orientation === "horizontal" ? "16 / 10" : "4 / 5"}
              src={image.src}
              alt={image.alt}
            />
            <div className={styles.caption}>
              <Text as="span" variant="label-strong-s">
                Frame {String(offset + index + 1).padStart(2, "0")}
              </Text>
              <Text as="span" variant="body-default-xs">
                {image.orientation === "horizontal" ? "Landscape" : "Portrait"}
              </Text>
            </div>
          </div>
        </article>
      ))}
    </Masonry>
  );
}
