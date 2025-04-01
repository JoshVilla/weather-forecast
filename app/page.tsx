"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ForecastType, WeatherType } from "./types";
import { getIcon } from "@/utils/helpers";
import Forecast from "./components/forecast";
import { motion } from "framer-motion";

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [forecast, setForecast] = useState<ForecastType[]>([]);
  const [location, setLocation] = useState("Cordon, Isabela");
  const [searchTerm, setSearchTerm] = useState(location);
  const [area, setArea] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=2`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data.current);
        setIsNight(data.current.is_day === 0);
        setForecast(data.forecast.forecastday);
        setArea(
          `${data.location.name}, ${data.location.region}, ${data.location.country}`
        );
      } else {
        console.error("Failed to fetch weather data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleSearch = () => {
    setLocation(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      {weather ? (
        <motion.div
          className="bg-white max-w-lg w-full rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <motion.input
              type="text"
              placeholder="Search Place"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress} // Search on Enter
              className="w-full md:w-64 px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button
              onClick={handleSearch}
              className="bg-blue-500 py-1 px-4 rounded text-white text-md hover:bg-blue-600 transition"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Search
            </motion.button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-4xl md:text-6xl font-bold text-center md:text-left">
                {weather.temp_c}°C
              </div>
              <div className="text-gray-500 mt-2 text-sm text-center md:text-left">
                {area}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/wind.png"
                    alt="wind"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm">{weather?.wind_kph} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/humidity.png"
                    alt="humidity"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm">{weather?.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/cloud.png"
                    alt="cloud"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm">{weather?.cloud}%</span>
                </div>
              </div>
            </div>
            <motion.div
              className="text-center mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={getIcon(weather?.condition?.code, isNight)}
                alt="weather icon"
                height={100}
                width={100}
                className="mx-auto"
              />
              <div className="text-lg mt-2">{weather?.condition?.text}</div>
            </motion.div>
          </div>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Forecast forecastday={forecast} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={require("@/public/assets/icons/weather.png")}
            alt="weather"
            width={100}
            height={100}
            className="mx-auto"
          />
          <div className="mt-4 text-white text-2xl">Weather Forecast</div>
        </motion.div>
      )}
    </div>
  );
}
