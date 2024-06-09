import { getSunriseDateTimeUtc, getSunsetDateTimeUtc } from "suntimes";

export const showTemperature = (value: number | null | undefined) => {
  //303.33
  return value?.toString().slice(0, 2) || "---";
};

export const getTimezonesByOffset = (offsetInSeconds: number) => {
  const offsets = [
    { name: "Pacific/Midway", offset: -39600 },
    { name: "Pacific/Honolulu", offset: -36000 },
    { name: "America/Anchorage", offset: -32400 },
    { name: "America/Los_Angeles", offset: -28800 },
    { name: "America/Denver", offset: -25200 },
    { name: "America/Chicago", offset: -21600 },
    { name: "America/New_York", offset: -18000 },
    { name: "America/Caracas", offset: -14400 },
    { name: "America/Halifax", offset: -14400 },
    { name: "America/St_Johns", offset: -12600 },
    { name: "America/Sao_Paulo", offset: -10800 },
    { name: "Atlantic/South_Georgia", offset: -7200 },
    { name: "Atlantic/Azores", offset: -3600 },
    { name: "Europe/London", offset: 0 },
    { name: "Europe/Berlin", offset: 3600 },
    { name: "Europe/Athens", offset: 7200 },
    { name: "Africa/Nairobi", offset: 10800 },
    { name: "Asia/Tehran", offset: 12600 },
    { name: "Asia/Dubai", offset: 14400 },
    { name: "Asia/Kabul", offset: 16200 },
    { name: "Asia/Karachi", offset: 18000 },
    { name: "Asia/Kolkata", offset: 19800 },
    { name: "Asia/Dhaka", offset: 21600 },
    { name: "Asia/Bangkok", offset: 25200 },
    { name: "Asia/Shanghai", offset: 28800 },
    { name: "Asia/Tokyo", offset: 32400 },
    { name: "Australia/Adelaide", offset: 34200 },
    { name: "Australia/Sydney", offset: 36000 },
    { name: "Pacific/Noumea", offset: 39600 },
    { name: "Pacific/Auckland", offset: 43200 },
  ];

  const result = offsets
    .filter((zone) => zone.offset === offsetInSeconds)
    .map((zone) => zone.name);

  return result[0];
};

interface IGetSunTime {
  text: string;
  lon: number;
  lat: number;
}
export const getSunTime = (
  text: "sunset" | "sunrise",
  lon: number,
  lat: number
): IGetSunTime => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  let isoString = "";

  if (text === "sunrise" && lat && lon) {
    isoString = getSunriseDateTimeUtc(new Date(year, month, day), lat, lon);
  } else if (text === "sunset" && lat && lon) {
    isoString = getSunsetDateTimeUtc(new Date(2024, 5, 6), lat, lon);
  }

  const date = new Date(isoString);

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds}`;

  const result =
    text === "sunrise" ? convertToSunriseTime(time) : convertToSunsetTime(time);

  return result;
};

function convertToSunriseTime(time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Convert 24-hour format to 12-hour format
  let amHours = hours % 12;
  amHours = amHours === 0 ? 12 : amHours; // Handle the midnight and noon case

  // Assuming the given time is PM and we want to convert it to AM
  let amTime = `${String(amHours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")} AM`;

  return amTime;
}

function convertToSunsetTime(time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  // Convert 24-hour format to 12-hour format
  let pmHours = hours % 12;
  pmHours = pmHours === 0 ? 12 : pmHours; // Handle the noon case

  // Append PM to the time
  let pmTime = `${String(pmHours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")} PM`;

  return pmTime;
}
