import React, { useEffect, useState } from "react";
import globalStyle from "../../global.module.scss";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { getSunTime } from "../../utils/helpers";
type Props = {
  info: IInfo;
};

interface IInfo {
  longitude: number;
  latitude: number;
}

const SunCondition = ({ info }: Props) => {
  const { latitude, longitude } = info;
  const isLoading = latitude === 0 && longitude === 0;
  const riseTime = isLoading
    ? "---"
    : getSunTime("sunrise", longitude, latitude);
  const setTime = isLoading ? "---" : getSunTime("sunset", longitude, latitude);
  return (
    <div className={`${globalStyle.glassBackground} p-4 w-[500px]`}>
      <div className="mb-4">Sun Condition</div>
      <div className="flex justify-evenly align-middle">
        <div className="flex align-middle gap-5">
          {" "}
          <FiSunrise className="text-2xl" />
          <span>{riseTime}</span>
        </div>
        <div className="flex align-middle gap-5">
          <FiSunset className="text-2xl" />
          <span>{setTime}</span>
        </div>
      </div>
    </div>
  );
};

export default SunCondition;
