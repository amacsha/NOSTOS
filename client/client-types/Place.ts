export interface Place {
  id: number;
  lat: number;
  lng: number;
  name: string;
  city: string; 
  entryCount?: number;
  lastVisitedCount?: number;
}