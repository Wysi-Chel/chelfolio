import { Badge, Column, Flex, Heading, SmartImage, Text } from "@/once-ui/components";
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
  const portraitCount = gallery.images.filter((image) => image.orientation === "vertical").length;

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
          <Text variant="heading-default-xl" onBackground="neutral-weak" wrap="balance">
            A calmer gallery presentation for edits, portraits, and details. Featured frames lead
            the page now, while the rest of the collection flows through an elevated masonry wall.
          </Text>
        </Column>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Frames</span>
            <strong className={styles.statValue}>{gallery.images.length}</strong>
            <span className={styles.statHint}>Curated photographs and edits</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Portraits</span>
            <strong className={styles.statValue}>{portraitCount}</strong>
            <span className={styles.statHint}>Vertical compositions in the set</span>
          </div>
        </div>
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
            <div className={styles.featuredCaption}>
              <Text as="span" variant="label-strong-s">
                Featured {String(index + 1).padStart(2, "0")}
              </Text>
              <Text as="span" variant="body-default-s">
                {image.orientation === "horizontal" ? "Landscape study" : "Portrait study"}
              </Text>
            </div>
          </article>
        ))}
      </section>

      <Flex fillWidth mobileDirection="column" vertical="end" horizontal="space-between" gap="16">
        <Column gap="8">
          <Text variant="label-default-s" onBackground="neutral-weak">
            Full Collection
          </Text>
          <Heading variant="heading-strong-l">Expanded gallery wall</Heading>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak" className={styles.sectionCopy}>
          Click any frame to enlarge it. The masonry layout keeps the page airy while letting the
          photography feel more tactile and curated.
        </Text>
      </Flex>

      <MasonryGrid images={archiveImages.length > 0 ? archiveImages : gallery.images} offset={featuredImages.length} />
    </Column>
  );
}
