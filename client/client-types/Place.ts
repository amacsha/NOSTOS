export interface Place {
  geometry: any;
  id: number;
  lat: number;
  lng: number;
  name: string;
  city: string;
  entryCount?: number;
  lastVisitedCount?: number;
}
