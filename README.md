# Food Delivery App

## Overview

This project explores backend technologies by building a simple food delivery app. The app includes features such as order processing, real-time location tracking, notifications, and more. Features will be added gradually, as this is a hobby project.

## Technology Stack

- **Backend**: Node.js with Express or NestJS for API development.
- **Database**: PostgreSQL with PostGIS for structured data, MongoDB for real-time data.
- **Message Queue**: RabbitMQ or Apache Kafka.
- **Real-time Updates**: Redis Pub/Sub, WebSockets.
- **Background Processing**: Bull (a Node.js queue library) or Kue.
- **Notification Service**: AWS SNS, Twilio, Firebase Cloud Messaging.

## Features Checklist

- **Database Selection**: Use PostgreSQL for structured data and MongoDB for real-time data.
- **Authentication & Authorization**: Implement user authentication and authorization.
- **Caching with Redis**: Cache frequently accessed data for improved performance.
- **Background Tasks and Queues**: Manage order processing, geospatial queries, delivery agent matching, real-time location tracking, and notifications.
- **Example Workflow**: Order placement, order processing, agent tracking, and notification service.
- **Additional Features**: Secure authentication, caching, geospatial queries, real-time updates, and notifications.

## How to Run the Project

### Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Pnpm](https://pnpm.io/installation)

### Installation

1. Fork and Clone the forked repository:

   ```bash
   git clone git@github.com:addegbenga/orderfast.git
   cd orderfast
   ```

2. Create an Environment File:

Create a new .env file in the root directory of the project by copying the existing .env.example file. This file contains the template for the necessary environment variables.

### Running with Docker Locally (Preffered)

For production mode with Docker:

```bash
pnpm run docker:prod
```

This command will build the Docker image and start the app in production mode using Docker Compose.

For development mode with Docker:

```bash
pnpm run docker:dev
```

This command will build the Docker image and start the app in development mode using Docker Compose and also watch rebuild the app on any code change.

### Application Ports

- **Application Port**: The server runs on `http://localhost:8080`.
- **RedisInsight Port**: RedisInsight runs on `http://localhost:8001`.

### Testing

Run unit tests:

```bash
pnpm run test
```

Run end-to-end tests:

```bash
pnpm run test:e2e
```

Generate test coverage report:

```bash
pnpm run test:cov
```

## Contribution
