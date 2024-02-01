export interface Entry {
  id?: number;
  placeId: number | null;
  authorId: number | null;
  title: string;
  content: string;
  creation_date?: string;
  tag: string[];
  ratingIds?: number[];
  commentIds?: number[];
}
