import axios from "axios";
import React, { useEffect, useState } from "react";
import globalStyle from "../../global.module.scss";
import WeatherIcon from "../../components/IconWeather";
import { getCurrentWeatherInfo } from "../../api/api";
import Time from "../../components/Time";
import WindCondition from "../../components/WindCondition";
import SunCondition from "../../components/SunRiseSunSet";
import SearchForm from "../../components/SearchPlace";

const Main = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    weatherIcon: "",
    temperature: null,
    weatherDescription: "",
  });
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [addressInfo, setAddressInfo] = useState({
    currAddress: "",
  });
  const [windInfo, setWindInfo] = useState({
    speed: null,
    deg: null,
    gust: null,
    cloud: null,
  });

  const [params, setParams] = useState({
    region: "",
    province: "",
    city: "",
  });

  useEffect(() => {
    const getData = () => {
      getCurrentWeatherInfo({
        lon: 121.4685,
        lat: 16.6783,
        mode: "metric",
      }).then((res) => {
        if (res) {
          localStorage.setItem("weatherInfo", JSON.stringify(res.data));
          const { name, sys, weather, main, coord, wind, clouds, timezone } =
            res.data || [];
          const { country } = sys;
          const { temp } = main;
          const { lon, lat } = coord;
          const { speed, deg, gust } = wind;
          const { all } = clouds;
          setAddressInfo({
            currAddress: `${name}, ${country}`,
          });
          // Capitalize First Letter of a String
          const weatherDescription =
            weather[0].description.charAt(0).toUpperCase() +
            weather[0].description.slice(1);
          setWeatherInfo({
            weatherIcon: weather[0].icon,
            temperature: temp,
            weatherDescription,
          });
          setLocation({
            longitude: lon,
            latitude: lat,
          });
          setWindInfo({
            speed,
            deg,
            gust,
            cloud: all,
          });
        }
      });
    };
    const interval = setInterval(() => {
      getData();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="">
        <div className="relative h-full">
          <div className="absolute top-10 left-40">
            <SearchForm onChange={setParams} />
          </div>
          <div
            className={`${globalStyle.glassBackground} absolute bottom-10 left-40 p-6 w-auto m-auto`}
          >
            <div className="text-left">
              <WeatherIcon
                iconName={weatherInfo.weatherIcon}
                temperature={weatherInfo.temperature}
                size={1}
              />
              <div className="mt-6">
                <div className="text-4xl font-bold">
                  {addressInfo.currAddress}
                </div>
                <div className="flex gap-6 mt-4">
                  <span>{weatherInfo.weatherDescription}</span>
                  <span>L: {location.longitude} °</span>
                  <span>H: {location.latitude} °</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 justify-center align-middle">
        <div>
          <Time />
        </div>
        <div>
          <WindCondition info={windInfo} />
        </div>
        <div>
          <SunCondition info={location} />
        </div>
      </div>
    </div>
  );
};

export default Main;
