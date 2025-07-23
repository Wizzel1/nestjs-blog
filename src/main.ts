import { NestFactory } from '@nestjs/core';
import { PostModule } from './posts/post.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(PostModule);

  // Configure body parsing for form data
  app.use(require('express').urlencoded({ extended: true }));

  // Configure static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Configure Nunjucks as the template engine
  const viewsPath = join(__dirname, '..', 'views');
  app.setBaseViewsDir(viewsPath);

  // Configure nunjucks environment
  const env = nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app.getHttpAdapter().getInstance(),
  });

  env.addFilter('date', function (timestamp, format) {
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
