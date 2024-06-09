import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Main from "./pages/Main";

function App() {
  const [image, setImage] = useState("");
  const weatherInfo = localStorage.getItem("weatherInfo");
  const weatherCode = JSON.parse(weatherInfo).weather[0].icon;
  const getTime = weatherCode.charAt(2);

  const style: React.CSSProperties = {
    backgroundImage: `url(/assets/backgrounds/day/${image}-background.jpg`,
  };

  useEffect(() => {
    if (getTime === "d") {
      if (weatherCode === "01d") setImage("clearsky");
      else if (weatherCode === "02d") setImage("fewclouds");
      else if (weatherCode === "03d") setImage("scaterredclouds");
      else if (weatherCode === "04d") setImage("brokenclouds");
      else if (weatherCode === "09d") setImage("showerain");
      else if (weatherCode === "10d") setImage("rain");
      else if (weatherCode === "11d") setImage("thunderstorm");
    } else {
      if (weatherCode === "01n") setImage("clearsky");
      else if (weatherCode === "02n") setImage("fewclouds");
      else if (weatherCode === "03n") setImage("scaterredclouds");
      else if (weatherCode === "04n") setImage("brokenclouds");
      else if (weatherCode === "09n") setImage("showerain");
      else if (weatherCode === "10n") setImage("rain");
      else if (weatherCode === "11n") setImage("thunderstorm");
    }
  }, [weatherInfo]);

  return (
    <div className={styles.mainContainer} style={style}>
      <Main />
    </div>
  );
}

export default App;
