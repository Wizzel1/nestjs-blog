import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from '../posts/post.service';
import { Post } from '../posts/post.model';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: number): Promise<Post | undefined> {
    return this.postService.getPostById(id);
  }
}
