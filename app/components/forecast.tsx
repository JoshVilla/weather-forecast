import React, { useEffect, useState } from "react";
import { ForecastType, Hour } from "../types";
import { formatDate, getAMPM, getIcon, getTime } from "@/utils/helpers";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion

type Props = {
  forecastday: ForecastType[];
};

const Forecast = (forecastday: Props) => {
  const [firstForecast, setFirstForecast] = useState<Hour[]>(
    forecastday?.forecastday[0]?.hour
  );
  const [secondForecast, setSecondForecast] = useState<Hour[]>(
    forecastday?.forecastday[1]?.hour
  );

  useEffect(() => {
    setFirstForecast(forecastday?.forecastday[0]?.hour);
    setSecondForecast(forecastday?.forecastday[1]?.hour);
  }, [forecastday]);

  return (
    <div className="space-y-4">
      <div className="bg-white w-full rounded-xl px-6 py-4 shadow-lg">
        <div className="text-sm">
          {formatDate(forecastday?.forecastday[0]?.date)}
        </div>
        <div className="mt-4 flex gap-10 pb-6 *:justify-between overflow-x-auto">
          {firstForecast.map((weather: Hour, index) => (
            <motion.div
              key={index}
              className="w-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay based on index
            >
              <div className="text-sm text-gray-700">{weather.temp_c}°C</div>
              <Image
                src={getIcon(
                  weather.condition.code,
                  getAMPM(weather.time) === "PM"
                )}
                alt="weather_icon"
                width={20}
                height={20}
                className="mx-auto my-4"
              />
              <div className="font-semibold text-sm">
                {getTime(weather.time)}
              </div>
              <div className="text-xs text-gray-500">
                {getAMPM(weather.time)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white w-full rounded-xl px-6 py-4 shadow-lg">
        <div className="text-sm">
          {formatDate(forecastday?.forecastday[1]?.date)}
        </div>
        <div className="mt-4 flex gap-10 pb-6 *:justify-between overflow-x-auto">
          {secondForecast.map((weather: Hour, index) => (
            <motion.div
              key={index}
              className="w-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay based on index
            >
              <div className="text-sm text-gray-700">{weather.temp_c}°C</div>
              <Image
                src={getIcon(
                  weather.condition.code,
                  getAMPM(weather.time) === "PM"
                )}
                alt="weather_icon"
                width={20}
                height={20}
                className="mx-auto my-4"
              />
              <div className="font-semibold text-sm">
                {getTime(weather.time)}
              </div>
              <div className="text-xs text-gray-500">
                {getAMPM(weather.time)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
