export interface UserState {
  id: number | null;
  email: string | null;
  username: string | null;
  filter_preference: string | null;
  isAuthenticated: boolean;
  firstLogin: boolean;
  entryIds?: number[];
  ratingIds?: number[];
  commentIds?: number[];
  lastVisitedIds?: number[];
}