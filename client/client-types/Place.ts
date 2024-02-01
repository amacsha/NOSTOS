export interface Place {
  geometry: any;
  id: string;
  lat: number;
  lng: number;
  name: string;
  city: string;
  entryCount?: number;
  lastVisitedCount?: number;
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface GooglePlaceResponse {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
}