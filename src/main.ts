import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT, 10) || 8080;

  const config = new DocumentBuilder()
    .setTitle('OrderNow API')
    .setDescription(
      'This project explores backend technologies by building a simple food delivery app. The app includes features such as order processing, real-time location tracking, notifications, and more.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);
  await app.listen(PORT, () => {
    console.log(`Running API in MODE: ${process.env.NODE_ENV} on port ${PORT}`);
  });
}
bootstrap();
