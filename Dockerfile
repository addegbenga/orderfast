ARG NODE_VERSION=21.5.0
ARG PNPM_VERSION=9.1.0

FROM node:${NODE_VERSION}-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM dev-deps AS dev
EXPOSE 8080
CMD ["pnpm", "start:dev"]
