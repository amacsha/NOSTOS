import { SmallEntry } from "./SmallEntry"
import { Comment } from "./Comment"
import { Rating } from "./Rating"
import { LastVisited } from "./LastVisited"

export interface Profile {
  userName: string,
  userEntries: SmallEntry[],
  userComments: Comment[],
  userRatings: Rating[],
  userLastVisited: LastVisited[]
}