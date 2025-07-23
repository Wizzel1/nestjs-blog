import { NestFactory } from '@nestjs/core';
import { PostModule } from './posts/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
