import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { PostsRepository } from './post.repository';
import { Post as PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostsRepository) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepo.getAllPosts();
  }

  getPostById(id: number): Promise<Post | undefined> {
    return this.postRepo.getPostById(id);
  }

  async createPost(data: any): Promise<void> {
    const existingPosts = await this.getAllPosts();
    const maxId =
      existingPosts.length > 0
        ? Math.max(...existingPosts.map((p) => p.id || 0))
        : 0;
    const newId = maxId + 1;
    const newPost = new PostModel(
      data.title,
      data.image || '', // Default to empty string if no image provided
      data.author,
      Math.floor(Date.now() / 1000), // Current timestamp in seconds
      data.teaser,
      data.content,
      newId,
    );

    return this.postRepo.addNewPost(newPost);
  }
}
