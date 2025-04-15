import { useEffect, useState } from "react";
import { Coordinates } from "@/domain/weather";

interface GeoLocation {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean | null;
}

export function useGeoLocation() {
  const [locationData, setLocationData] = useState<GeoLocation>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    console.log("Fetching location");
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "GeoLocation not supported",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location Permission Denied. Please provide the permission";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "location information is not available";
            break;
          default:
            errorMessage = "Unknown error occurred";
            break;
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
    );
  };

  useEffect(getLocation, []);

  return {
    ...locationData,
    getLocation,
  };
}
