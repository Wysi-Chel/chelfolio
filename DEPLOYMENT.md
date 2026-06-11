# Deployment

This repository is a Next.js app with runtime pages and API routes, so it requires a Node host rather than plain static hosting.

## Build locally

```bash
npm install
npm run build
```

## Run locally with Docker

```bash
docker build -t chelfolio-app .
docker run --rm -p 3000:3000 chelfolio-app
```

Then open `http://localhost:3000`.

## Deploy to a container-friendly host

Use this repository's `Dockerfile` to deploy on any provider that accepts Docker images, including many tech-domain hosts.

1. Build the container image.
2. Push it to your container registry.
3. Configure the host to run the image on port `3000`.

## Notes

- This app uses `src/app/og/route.tsx` and `src/pages/api/*`, so it is not suitable for static-only providers like GitHub Pages without rewrites.
- If you need a specific target host, I can add a provider-specific manifest (e.g. `render.yaml`, `fly.toml`, or `Procfile`).
