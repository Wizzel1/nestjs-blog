export class Post {
  constructor(
    public title: string,
    public image: string,
    public author: string,
    public createdAt: number,
    public teaser: string,
    public content: string,
    public id?: number | undefined,
  ) {}
}
