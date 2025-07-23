import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  Redirect,
} from '@nestjs/common';
import { PostService } from '../posts/post.service';
import { Response } from 'express';
import { Post as PostModel } from './post.model';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @Render('posts')
  async getAllPosts() {
    const posts = await this.postService.getAllPosts();
    return { posts };
  }

  @Get('/new')
  @Render('new')
  async createPost() {
    return {};
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postService.getPostById(Number(id));
    if (!post) {
      return res.status(404).render('404');
    }
    return res.render('post', { post });
  }

  @Post()
  async handleCreatePost(
    @Body()
    body,
    @Res() res: Response,
  ) {
    try {
      await this.postService.createPost(body);
      return res.redirect('/');
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).render('404');
    }
  }
}
