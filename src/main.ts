import { NestFactory } from '@nestjs/core';
import { PostModule } from './posts/post.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import nunjucks from 'nunjucks';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(PostModule);

  // Configure body parsing for form data
  app.use(express.urlencoded({ extended: true }));

  // Configure static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Configure Nunjucks as the template engine
  const viewsPath = join(__dirname, '..', 'views');
  app.setBaseViewsDir(viewsPath);

  // Configure nunjucks environment
  const env: nunjucks.Environment = nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app.getHttpAdapter().getInstance() as express.Application,
  });

  env.addFilter('date', function (timestamp: string | number | Date) {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  app.setViewEngine('njk');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
