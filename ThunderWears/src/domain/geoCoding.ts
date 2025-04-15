export interface GeoCodingResponse {
  name: string;
  localName?: Record<string, string>;
  lat: number;
  lon: number;
  state?: string;
  country: string;
}
