import axios from "axios";
import { BASE } from "../utils/const";
import { log } from "console";

export const getCurrentWeatherInfo = async (params = {}) => {
  return await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      ...params,
      appid: "a9959a2b3b0e2a53eba9a73315a0c4c8",
    },
  });
};
