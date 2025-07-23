import { Injectable } from '@nestjs/common';
import { Post } from './post.model';
import { getAllPostsData, saveNewQuotesData } from './posts.data';

@Injectable()
export class PostsRepository {
  private posts: Post[] | null = null;

  async getAllPosts(): Promise<Post[]> {
    this.posts = await getAllPostsData();
    return this.posts;
  }

  async getPostById(id: number): Promise<Post | undefined> {
    const posts = await this.getAllPosts();
    const post = posts.find((post) => Number(post.id) === id);
    return post;
  }

  async addNewPost(post: Post): Promise<void> {
    const posts = await this.getAllPosts();
    await saveNewQuotesData([...posts, post]);
  }
}
