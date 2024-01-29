interface Comment {
  commenterId: number,
  content: string
  creation_date: Date
  entryId: number
}

interface Place {
  lat: number,
  lng: number,
  name: string,
  city: string
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
  placeId: number;
  visit_time: Date;
}

export type {Comment, Place, UserType, LastVisited };
