import { Badge, Column, Flex, Heading, SmartImage } from "@/once-ui/components";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL } from "@/app/resources";
import { gallery, person } from "@/app/resources/content";
import styles from "./gallery.module.scss";

export async function generateMetadata() {
  const title = gallery.title;
  const description = gallery.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/gallery`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Gallery() {
  const featuredImages = gallery.images.slice(0, 4);
  const archiveImages = gallery.images.slice(4);

  return (
    <Column fillWidth gap="40" paddingX="l" className={styles.page}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: gallery.title,
            description: gallery.description,
            url: `https://${baseURL}/gallery`,
            image: gallery.images.map((image) => ({
              "@type": "ImageObject",
              url: `https://${baseURL}${image.src}`,
              description: image.alt,
            })),
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Flex mobileDirection="column" gap="24" className={styles.hero}>
        <Column gap="16" className={styles.heroCopy}>
          <Badge title="Photography Archive" icon="gallery" arrow={false} effect={false} />
          <Heading variant="display-strong-m" wrap="balance">
            {gallery.title}
          </Heading>
        </Column>
      </Flex>

      <section className={styles.featuredGrid}>
        {featuredImages.map((image, index) => (
          <article
            key={image.src}
            className={`${styles.featuredItem} ${styles[`featuredItem${index + 1}`]}`}
          >
            <SmartImage
              priority
              enlarge
              radius="xl"
              src={image.src}
              alt={image.alt}
              aspectRatio={
                index === 0 ? "4 / 5" : index === 3 ? "16 / 9" : image.orientation === "vertical" ? "4 / 5" : "1 / 1"
              }
              className={styles.featuredMedia}
            />
          </article>
        ))}
      </section>


      <MasonryGrid images={archiveImages.length > 0 ? archiveImages : gallery.images} offset={featuredImages.length} />
    </Column>
  );
}
