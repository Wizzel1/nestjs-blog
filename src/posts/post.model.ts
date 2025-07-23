export class Post {
  constructor(
    public id: number,
    public image: string,
    public author: string,
    public createdAt: number,
    public teaser: string,
    public content: string,
  ) {}
}
