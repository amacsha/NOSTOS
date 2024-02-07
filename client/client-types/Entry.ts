export interface Entry {
  id?: number;
  placeId: string | null;
  authorId: number | null;
  title: string;
  content: string;
  creation_date?: string;
  tag: string[];
  ratingIds?: number[];
  commentIds?: number[];
}
