interface rating {
    raterId: Number,
    entryId: Number,
    value: Number
}

interface entry {

}

interface Place {
    id?: number
    lat: number,
    lng: number,
    name: string,
    city: string
}

export type {rating, Place, entry}