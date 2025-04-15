import { GeoCodingResponse } from "@/domain/geoCoding";
import { WeatherResponse } from "@/domain/weather";

import { Card, CardContent } from "./ui/card";
import { Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherResponse;
  locationName?: GeoCodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col gap-6">
          {/* Location Header */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <h1 className="text-2xl font-semibold ">{locationName?.name}</h1>
              {locationName?.state && (
                <span className="text-lg">, {locationName.state}</span>
              )}
            </div>
            <p>{locationName?.country}</p>
          </div>

          <div className="flex justify-between items-start">
            {/* Temperature Section */}
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <p className="text-6xl font-light tracking-tight">
                  {formatTemp(temp)}
                </p>
                <div className="mb-1.5 space-y-0.5">
                  <p className="text-sm">Feels like {formatTemp(feels_like)}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="text-blue-500">
                      {formatTemp(temp_min)} min
                    </span>
                    <span className="text-red-500">
                      {formatTemp(temp_max)} max
                    </span>
                  </div>
                </div>
              </div>

              {/* Weather Stats */}
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm ">{humidity}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span className="text-sm ">{speed} m/s</span>
                </div>
              </div>
            </div>

            {/* Weather Icon */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm capitalize -mt-2">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
