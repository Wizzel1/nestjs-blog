// src/quotes.data.ts
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Post } from './post.model';

const PATH = path.join(__dirname, '../../src/data/blogPosts.json');
export const getAllPostsData = async (): Promise<Post[]> => {
  try {
    const raw = await fs.readFile(PATH, 'utf-8');
    return JSON.parse(raw) as Post[];
  } catch (error) {
    console.error(error);
    throw new Error('could not read all quotes');
  }
};

export const saveNewQuotesData = async (newPosts: Post[]): Promise<void> => {
  try {
    const json = JSON.stringify(newPosts, null, 2);
    await fs.writeFile(PATH, json, 'utf-8');
  } catch (error) {
    console.error(error);
    throw new Error('Could not save quotes');
  }
};
