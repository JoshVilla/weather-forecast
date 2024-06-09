import React, { useMemo, useState } from "react";
import { showTemperature } from "../../utils/helpers";
import styles from "./style.module.scss";

type Props = {
  size: number;
  iconName: string;
  temperature?: number | null;
};

const WeatherIcon = ({ size, iconName, temperature }: Props) => {
  const [path, setPath] = useState("");
  useMemo(() => {
    const fileName = `${iconName}.png`;
    const getTime = iconName.charAt(2) || "";
    const folder = getTime === "n" ? "night" : "day";
    setPath(`/assets/${folder}/${fileName}`);
  }, [iconName]);

  return (
    <div className="flex gap-10 w-full">
      <div className="text-8xl font-bold">
        {`${showTemperature(temperature)}`}
        <sup className="text-6xl"> °C</sup>
      </div>
      <img src={path} alt="" />
    </div>
  );
};

export default WeatherIcon;
