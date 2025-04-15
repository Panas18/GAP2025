import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeolocation";
import WeatherSkeleton from "@/components/ui/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { HourlyTemperature } from "@/components/hourly-temperature";
import { WeatherDetails } from "@/components/weather-details";
const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>{locationError}</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Please enable location to see your weather</p>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch data. Please try again</p>
          <Button
            className="cursor-pointer"
            variant={"outline"}
            size={"icon"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetched || locationQuery.isFetching}
          >
            <RefreshCw className="h-4 w-4 " />
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="py-4">
      {/* // favourit city */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Location</h1>
        <Button
          className="cursor-pointer"
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled
        >
          <RefreshCw
            className={`h-4 w-4 ${weatherQuery.isFetching || locationQuery.isFetching ? "animate-spin" : ""} `}
          />
        </Button>
      </div>

      <div className="grid gap-5">
        <div>
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          ></CurrentWeather>
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div>
          <WeatherDetails data={weatherQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
