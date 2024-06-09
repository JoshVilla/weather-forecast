import moment from "moment";
import React from "react";
import globalStyle from "../../global.module.scss";
type Props = {};

const Time = (props: Props) => {
  const dayTime = moment().format("dddd");
  const date = moment().format("LL");
  const time = moment().format("LT");
  return (
    <div className={`${globalStyle.glassBackground} text-center p-4 w-96`}>
      <div className="text-6xl font-bold">{time}</div>{" "}
      <div className="text-2xl mt-2  font-bold flex gap-4 justify-between ">
        <span>{dayTime}</span>
        <span>{date}</span>
      </div>
      <div></div>
    </div>
  );
};

export default Time;
