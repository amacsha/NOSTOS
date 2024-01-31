export interface Entry {
  id: number;
  placeId: number;
  authorId: number;
  title: string;
  content: string;
  creation_date: string; 
  tag: string[];
  // ratingIds: number[]; 
  // commentIds: number[];
}
