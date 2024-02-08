interface rating {
    raterId: number,
    entryId: number,
    value: number
}
interface entry {
  id: number,
  placeId: string,
  authorId: number,
  title: string,
  content: string,
  creation_date: Date,
  tags: string[]
}

interface newEntry {
  placeId: string,
  authorId: number,
  title: string,
  content: string,
  tag: string[]
}

interface SmallEntry {
  "authorId": number,
  "title": string,
  "creation_date": Date,
  "tag": string[],
  "id": number,
}

interface NewPlace {
  id: string,
  lat: number,
  lng: number,
  name: string,
  city: string
}
interface Comment {
  commenterId: number,
  content: string
  creation_date?: Date
  entryId: number
}

interface Place {
  id: string,
  lat: number,
  lng: number,
  name: string,
  city: string,
}

interface UserType {
  id: number;
  email: string;
  username: string;
  password: string;
  filter_preference: string;
}

interface LastVisited {
  userId: number;
  placeId: string;
  visit_time: Date;
}

export type {Comment, NewPlace, Place, UserType, LastVisited, rating, entry, newEntry, SmallEntry};
