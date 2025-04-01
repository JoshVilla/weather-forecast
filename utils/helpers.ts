import {
  weatherClearCode,
  weatherCloudyCode,
  weatherDrizzleCode,
  weatherHeavyRainCode,
  weatherLightningCode,
  weatherPartlyCloudyCode,
  weatherRainCode,
  weatherSnowCode,
  weatherThunderstormCode,
} from "@/app/weatherCodes";
const imagePath = "/assets/"; // Update path for public folder

const nightIcons: Record<number, string> = {
  ...Object.fromEntries(
    weatherClearCode.map((code) => [code, "nightly-clear.png"])
  ),
  ...Object.fromEntries(
    weatherPartlyCloudyCode.map((code) => [code, "nightly-partly-cloudy.png"])
  ),
  ...Object.fromEntries(
    weatherCloudyCode.map((code) => [code, "nightly-cloudy.png"])
  ),
  ...Object.fromEntries(
    weatherRainCode.map((code) => [code, "nightly-rain.png"])
  ),
  ...Object.fromEntries(
    weatherThunderstormCode.map((code) => [code, "thunderstorm.png"])
  ),
  ...Object.fromEntries(
    weatherDrizzleCode.map((code) => [code, "nightly-drizzle.png"])
  ),
  ...Object.fromEntries(
    weatherSnowCode.map((code) => [code, "nightly-snow.png"])
  ),
  ...Object.fromEntries(
    weatherLightningCode.map((code) => [code, "lightning.png"])
  ),
  ...Object.fromEntries(
    weatherHeavyRainCode.map((code) => [code, "heavy-rain.png"])
  ),
};

const dayIcons: Record<number, string> = {
  ...Object.fromEntries(
    weatherClearCode.map((code) => [code, "sunny-clear.png"])
  ),
  ...Object.fromEntries(
    weatherPartlyCloudyCode.map((code) => [code, "sunny-partly-cloudy.png"])
  ),
  ...Object.fromEntries(
    weatherCloudyCode.map((code) => [code, "sunny-cloudy.png"])
  ),
  ...Object.fromEntries(
    weatherRainCode.map((code) => [code, "sunny-rain.png"])
  ),
  ...Object.fromEntries(
    weatherThunderstormCode.map((code) => [code, "thunderstorm.png"])
  ),
  ...Object.fromEntries(
    weatherDrizzleCode.map((code) => [code, "sunny-drizzle.png"])
  ),
  ...Object.fromEntries(
    weatherSnowCode.map((code) => [code, "sunny-snow.png"])
  ),
  ...Object.fromEntries(
    weatherLightningCode.map((code) => [code, "lightning.png"])
  ),
  ...Object.fromEntries(
    weatherHeavyRainCode.map((code) => [code, "heavy-rain.png"])
  ),
};

export const getIcon = (code: number, isNight: boolean) => {
  const selectedIcons = isNight ? nightIcons : dayIcons;
  return `${imagePath}${selectedIcons[code] || "unknown.png"}`;
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const getAMPM = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("en-US", { hour12: true }).split(" ")[1]; // Extract AM or PM
};
