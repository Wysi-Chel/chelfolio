"use client";

import React, { CSSProperties, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

import { Flex, Skeleton } from "@/once-ui/components";

export interface SmartImageProps extends React.ComponentProps<typeof Flex> {
  aspectRatio?: string;
  height?: number;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties["objectFit"];
  naturalSize?: boolean;
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
  sizes?: string;
  priority?: boolean;
}

const SmartImage: React.FC<SmartImageProps> = ({
  aspectRatio,
  height,
  alt = "",
  isLoading = false,
  objectFit = "cover",
  naturalSize = false,
  enlarge = false,
  src,
  unoptimized = false,
  priority,
  sizes = "100vw",
  ...rest
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(true);
    }
  };

  const closeLightbox = () => setIsEnlarged(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!enlarge) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsEnlarged(true);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEnlarged) {
        setIsEnlarged(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isEnlarged]);

  useEffect(() => {
    if (!isEnlarged) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isEnlarged]);

  const isYouTubeVideo = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?controls=0&rel=0&modestbranding=1`
      : "";
  };

  const isVideo = src?.toLowerCase().endsWith(".mp4");
  const isYouTube = isYouTubeVideo(src);

  return (
    <>
      <Flex
        fillWidth
        overflow="hidden"
        position="relative"
        zIndex={0}
        cursor={enlarge ? "interactive" : ""}
        role={enlarge ? "button" : undefined}
        tabIndex={enlarge ? 0 : undefined}
        style={{
          outline: "none",
          isolation: "isolate",
          height: naturalSize ? "auto" : aspectRatio ? "" : height ? `${height}rem` : "100%",
          aspectRatio: naturalSize ? undefined : aspectRatio,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {isLoading && <Skeleton shape="block" />}
        {!isLoading && isVideo && (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: naturalSize ? "auto" : "100%",
              display: "block",
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && isYouTube && (
          <iframe
            width="100%"
            height="100%"
            src={getYouTubeEmbedUrl(src)}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && !isVideo && !isYouTube && (
          naturalSize ? (
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: objectFit,
              }}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              priority={priority}
              sizes={sizes}
              unoptimized={unoptimized}
              fill
              style={{
                objectFit: objectFit,
              }}
            />
          )
        )}
      </Flex>

      {isEnlarged && enlarge && typeof document !== "undefined" && ReactDOM.createPortal(
        <Flex
          horizontal="center"
          vertical="center"
          position="fixed"
          background="overlay"
          onClick={closeLightbox}
          top="0"
          left="0"
          opacity={isEnlarged ? 100 : 0}
          cursor="interactive"
          transition="macro-medium"
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Enlarged media"}
          style={{
            width: "100vw",
            height: "100dvh",
            padding: "clamp(1rem, 3vw, 2rem)",
            zIndex: 1000,
          }}
        >
          <Flex
            position="relative"
            style={{
              width: "min(92vw, 1200px)",
              height: "min(86dvh, 900px)",
              maxWidth: "1200px",
              maxHeight: "86dvh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : isYouTube ? (
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(src)}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                unoptimized={unoptimized}
                style={{
                  objectFit: "contain",
                }}
              />
            )}
          </Flex>
        </Flex>,
        document.body,
      )}
    </>
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };
