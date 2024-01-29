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

export type {Comment, Place}