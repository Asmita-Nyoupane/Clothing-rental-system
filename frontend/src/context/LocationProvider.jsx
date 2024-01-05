// LocationContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [viewNearbyPosts, setViewNearbyPosts] = useState(false);

  const [nearby, setNearby] = useState("NearBy");

  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(
            "User's current location :",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        options
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported");
    }
  }, []);

  const updateUserLocation = (latitude, longitude) => {
    setUserLocation({ latitude, longitude });
  };

  const toggleViewNearbyPosts = () => {
    setViewNearbyPosts((prev) => !prev);
    // toggel the inner text of button
    setNearby((prevNearby) => (prevNearby === "NearBy" ? "Explore" : "NearBy"));
  };
  useEffect(() => {
    console.log("nearer post:", viewNearbyPosts);
  }, [viewNearbyPosts]); // Log viewNearbyPosts when it changes

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        updateUserLocation,
        viewNearbyPosts,
        toggleViewNearbyPosts,
        nearby,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation };
