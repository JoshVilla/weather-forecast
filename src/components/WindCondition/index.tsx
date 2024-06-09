import React from "react";
import globalStyle from "../../global.module.scss";
type Props = {
  info: IInfo;
};

interface IInfo {
  speed: null;
  deg: null;
  gust: null;
  cloud: null;
}

const WindCondition = ({ info }: Props) => {
  const { speed, deg, gust, cloud } = info || {};
  var directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];

  function getDirection(heading) {
    let index =
      Math.round(((heading %= 360) < 0 ? heading + 360 : heading) / 45) % 8;
    return heading ? directions[index] : "---";
  }
  return (
    <div className={`${globalStyle.glassBackground} p-6 w-[500px]`}>
      Wind Condition
      <div className="mt-4 grid grid-cols-2">
        <div className="p-2">
          <div className="flex justify-start align-middle gap-4">
            <i className="fa-solid fa-gauge text-xl" />
            <span className="text-gray">Wind Speed</span>
          </div>
          <div className="ml-10 text-2xl font-bold">{`${
            speed || "---"
          } m/sec`}</div>
        </div>
        <div className="p-2">
          <div className="flex justify-start align-middle gap-4">
            <i className="fa-solid fa-wind text-xl" />
            <span className="text-gray">Gustiness</span>
          </div>
          <div className="ml-10 text-2xl font-bold">{`${
            gust || "---"
          } m/sec`}</div>
        </div>
        <div className="p-2">
          <div className="flex justify-start align-middle gap-4">
            <i className="fa-regular fa-compass text-xl" />
            <span className="text-gray">Direction</span>
          </div>
          <div className="ml-10 text-2xl font-bold">{getDirection(deg)}</div>
        </div>
        <div className="p-2">
          <div className="flex justify-start align-middle gap-4">
            <i className="fa-solid fa-cloud text-xl" />
            <span className="text-gray">Cloudiness</span>
          </div>
          <div className="ml-10 text-2xl font-bold">{`${cloud || "---"}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default WindCondition;
