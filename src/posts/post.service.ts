import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { PostsRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostsRepository) {}

  getAllPosts(): Promise<Post[]> {
    return this.postRepo.getAllPosts();
  }

  getPostById(id: number): Promise<Post | undefined> {
    return this.postRepo.getPostById(id);
  }

  createPost(post: Post): Promise<void> {
    return this.postRepo.addNewPost(post);
  }
}
