import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostsRepository } from './post.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostsRepository],
})
export class PostModule {}
