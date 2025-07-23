import { Body, Controller, Get, Param, Post, Render, Res, Redirect  } from '@nestjs/common';
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

  @Get("/new")
  @Render("new")
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
    @Body() body: { title: string; author: string; image?: string; teaser: string; content: string },
    @Res() res: Response
  ) {
    try {
      // Generate a new ID (simple approach - get max existing ID + 1)
      const existingPosts = await this.postService.getAllPosts();
      const maxId = existingPosts.length > 0 ? Math.max(...existingPosts.map(p => p.id || 0)) : 0;
      const newId = maxId + 1;

      // Create new post with current timestamp
      const newPost = new PostModel(
        body.title,
        body.image || '', // Default to empty string if no image provided
        body.author,
        Math.floor(Date.now() / 1000), // Current timestamp in seconds
        body.teaser,
        body.content,
        newId
      );

      // Save the post
      await this.postService.createPost(newPost);

      // Redirect to home page to show all posts
      return res.redirect('/');
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).render('404'); // You might want to create an error template
    }
  }
}
