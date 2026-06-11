"use client";

import { useState } from "react";
import { formatDate } from "@/app/utils/formatDate";
import {
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  githubLink?: string;
  publishedAt: string;
  tag?: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  githubLink = "",
  publishedAt,
  tag,
  index,
}) => {
  const media = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];
  const summary =
    description?.trim() || "Selected work from my archive of editing, design, and web experiments.";
  const hasCaseStudy = Boolean(content?.trim());

  return (
    <Column as="article" fillWidth className={styles.card}>
      <Flex fillWidth mobileDirection="column" gap="24" className={styles.inner}>
        <Column fillWidth gap="16" className={styles.mediaColumn}>
          <Flex fillWidth horizontal="space-between" vertical="center" wrap gap="12">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatDate(publishedAt)}
            </Text>
          </Flex>
          {activeMedia ? (
            <Column fillWidth gap="12">
              <SmartImage
                priority={priority}
                radius="xl"
                border="neutral-alpha-medium"
                background="page"
                alt={`${title} preview ${activeIndex + 1}`}
                src={activeMedia}
                objectFit="contain"
                height={22}
                enlarge
                className={styles.preview}
              />
              {media.length > 1 && (
                <Flex wrap gap="12" className={styles.thumbnailGrid}>
                  {media.map((image, imageIndex) => (
                    <button
                      key={`${image}-${imageIndex}`}
                      type="button"
                      onClick={() => setActiveIndex(imageIndex)}
                      className={`${styles.thumbnailButton} ${
                        imageIndex === activeIndex ? styles.thumbnailButtonActive : ""
                      }`}
                      aria-label={`Show preview ${imageIndex + 1} for ${title}`}
                      aria-pressed={imageIndex === activeIndex}
                    >
                      <SmartImage
                        radius="l"
                        border="neutral-alpha-medium"
                        background="page"
                        alt={`${title} thumbnail ${imageIndex + 1}`}
                        src={image}
                        objectFit="contain"
                        height={5}
                      />
                    </button>
                  ))}
                </Flex>
              )}
            </Column>
          ) : (
            <Flex
              fillWidth
              vertical="center"
              horizontal="center"
              padding="24"
              className={styles.emptyState}
            >
              <Text variant="body-default-s" onBackground="neutral-weak">
                Add project media to the images array in this project&apos;s frontmatter to show it here.
              </Text>
            </Flex>
          )}
        </Column>

        <Column fillWidth gap="20" className={styles.contentColumn}>
          <Flex wrap gap="8">
            {tag && <Tag variant="neutral" label={tag} />}
            {githubLink && <Tag variant="neutral" prefixIcon="github" label="Source available" />}
          </Flex>

          <Column gap="12">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            <Text wrap="pretty" variant="body-default-m" onBackground="neutral-weak">
              {summary}
            </Text>
          </Column>

          {avatars?.length > 0 && (
            <Flex gap="12" vertical="center" wrap>
              <AvatarGroup avatars={avatars} size="m" reverse />
              <Text variant="body-default-s" onBackground="neutral-weak">
                Built with collaborators and contributors.
              </Text>
            </Flex>
          )}

          <Flex wrap gap="12" className={styles.actionRow}>
            {hasCaseStudy && (
              <Button href={href} variant="primary" suffixIcon="arrowRight">
                Case study
              </Button>
            )}
            {link && (
              <Button
                href={link}
                variant={hasCaseStudy ? "secondary" : "primary"}
                suffixIcon="arrowUpRightFromSquare"
              >
                Live project
              </Button>
            )}
            {githubLink && (
              <Button
                href={githubLink}
                variant={hasCaseStudy || link ? "tertiary" : "secondary"}
                prefixIcon="github"
              >
                GitHub
              </Button>
            )}
          </Flex>

          <Text variant="body-default-s" onBackground="neutral-weak" className={styles.helperText}>
            {githubLink
              ? "Click the preview to open it larger."
              : "Click the preview to open it larger. Add a github field in the project frontmatter to display a source link here."}
          </Text>
        </Column>
      </Flex>
    </Column>
  );
};
