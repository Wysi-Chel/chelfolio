import { getPosts } from "@/app/utils/utils";
import { Badge, Column, Flex, Heading, Text } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";
import styles from "./work.module.scss";

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
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

export default function Work() {
  let allProjects = getPosts(["src", "app", "work", "projects"]);
  const totalAssets = allProjects.reduce((count, project) => count + (project.metadata.images?.length || 0), 0);
  const openSourceProjects = allProjects.filter((project) => project.metadata.github).length;

  const getProjectImage = (project: (typeof allProjects)[number]) => {
    const coverImage = project.metadata.image || project.metadata.images?.find((asset) => !asset.endsWith(".mp4"));
    return coverImage ? `https://${baseURL}${coverImage}` : `https://${baseURL}/og?title=${encodeURIComponent(project.metadata.title)}`;
  };

  return (
    <Column maxWidth="xl" paddingX="l" gap="40">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(work.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/work/${project.slug}`,
              image: getProjectImage(project),
              sameAs: [project.metadata.link, project.metadata.github].filter(Boolean),
            })),
          }),
        }}
      />
      <Flex mobileDirection="column" gap="24" className={styles.hero}>
        <Column gap="16" className={styles.heroCopy}>
          <Badge title="Selected Work" icon="grid" arrow={false} effect={false} />
          <Heading variant="display-strong-m" wrap="balance">
            {work.title}
          </Heading>
          <Text variant="heading-default-xl" onBackground="neutral-weak" wrap="balance">
            A gallery-style archive of web builds, visual edits, and experiments. Each project can
            now carry live and GitHub links, with media presented as a browsable showcase instead
            of a single cropped frame.
          </Text>
        </Column>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Projects</span>
            <strong className={styles.statValue}>{allProjects.length}</strong>
            <span className={styles.statHint}>Curated portfolio entries</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Media</span>
            <strong className={styles.statValue}>{totalAssets}</strong>
            <span className={styles.statHint}>Images and motion previews</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>GitHub Ready</span>
            <strong className={styles.statValue}>{openSourceProjects}</strong>
            <span className={styles.statHint}>Projects with source links</span>
          </div>
        </div>
      </Flex>
      <Projects />
    </Column>
  );
}
