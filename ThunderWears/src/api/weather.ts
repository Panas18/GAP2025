import { Coordinates, WeatherResponse } from "@/domain/weather";
import { API_CONFIG } from "./config";
import { END_POINTS, WEATHER_UNIT } from "@/constants/optionSet";
import { ForecastResponse } from "@/domain/forecast";
import { GeoCodingResponse } from "@/domain/geoCoding";

class Weather {
  private createURL(baseUrl: string, param: Record<string, string | number>) {
    const searchParam = new URLSearchParams({
      appid: API_CONFIG.APP_ID,
      ...param,
    });

    return `${baseUrl}?${searchParam.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates) {
    const url = this.createURL(`${API_CONFIG.BASE_URL}/${END_POINTS.weather}`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: WEATHER_UNIT.metric,
    });

    return this.fetchData<WeatherResponse>(url);
  }

  async getForecast({ lat, lon }: Coordinates) {
    const url = this.createURL(
      `${API_CONFIG.BASE_URL}/${END_POINTS.forecast}`,
      {
        lat: lat.toString(),
        lon: lon.toString(),
        units: WEATHER_UNIT.metric,
      },
    );

    return this.fetchData<ForecastResponse>(url);
  }
  async reverseGeoCode({ lat, lon }: Coordinates) {
    const url = this.createURL(`${API_CONFIG.GEO_URL}/${END_POINTS.reverse}`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: WEATHER_UNIT.metric,
    });

    return this.fetchData<GeoCodingResponse[]>(url);
  }

  async searchLocation(query: string) {
    const url = this.createURL(`${API_CONFIG.GEO_URL}/${END_POINTS.direct}`, {
      q: query,
      limit: 5,
    });

    return this.fetchData<GeoCodingResponse[]>(url);
  }
}

export const weatherAPI = new Weather();
