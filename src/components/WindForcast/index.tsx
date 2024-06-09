import React from "react";

type Props = {
  data?: [];
  className: string;
};

const WindForcast = ({ data, className }: Props) => {
  return <div className={className}>WindCforcast</div>;
};

export default WindForcast;
