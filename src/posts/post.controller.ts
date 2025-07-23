import { Controller, Get, Param, Render, Res  } from '@nestjs/common';
import { PostService } from '../posts/post.service';
import { Response } from 'express';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Render('posts')
  async getAllPosts() {
    const posts = await this.postService.getAllPosts();
    return { posts };
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postService.getPostById(Number(id));
    if (!post) {
      return res.status(404).render('404');
    }
    return res.render('post', { post });
  }
}
