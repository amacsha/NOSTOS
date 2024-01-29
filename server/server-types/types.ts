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

export { UserType, LastVisited };
