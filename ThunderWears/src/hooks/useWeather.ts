import { weatherAPI } from "@/api/weather";
import { Coordinates } from "@/domain/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
  weather: (cords: Coordinates) => ["weather", cords] as const,
  forecast: (cords: Coordinates) => ["forecast", cords] as const,
  geoCode: (cords: Coordinates) => ["geoCode", cords] as const,
  search: (query: string) => ["search", query] as const,
};

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lon: 0, lat: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lon: 0, lat: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useReverseGeoCodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.geoCode(coordinates ?? { lon: 0, lat: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeoCode(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEY.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length > 3,
  });
}
