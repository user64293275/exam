import { useEffect, useState } from 'react'
import { MdWhereToVote } from "react-icons/md";
import { Link } from 'react-router-dom'
import { MdOutlineVisibility } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaWind } from "react-icons/fa6";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { BsCloudsFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { BsFillCloudSnowFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { WiCloudyWindy } from "react-icons/wi";
import { IoSunny } from "react-icons/io5";
import { IoCloudSharp } from "react-icons/io5";
import Rain from "./pictures/rain.jpg";
import Snow from "./pictures/snow.jpg";
import Sun from "./pictures/sunny.jpg";
import Windy from "./pictures/windy.jpg";
import Cloudy from "./pictures/cloudy.jpg";
import Sky from "./pictures/sky.jpg";
import Mist from "./pictures/mist.jpg";

const Paris = () => {
    const [weatherState, setWeatherState] = useState(null);
    const [forecastState, setForecastState] = useState(null);
    const [dailyforecastState, setDailyForecastState] = useState(null);
    const API_KEY = "9e98ea3f6af74469a0bc3f1150e1736a&units";
  useEffect(() => {
    
      const currentWeather = async (url) => {
        try {  
            const response = await fetch(url);
            const data = await response.json();
            console.log("Response from API:", data);
            setWeatherState(data);

            if (data) {
                const description = data.weather[0]?.description;
              const container = document.getElementById("Munich");
              const icon = document.getElementById('icon')
                if (description.includes("rain")) {
                  document.body.style.backgroundImage = `url(${Rain})`;
                  container.style.backgroundImage = `url(${Rain})`;
                  icon.innerHTML = `${<FaCloudShowersHeavy />}`
                } else if (description.includes("snow")) {
                  document.body.style.backgroundImage = `url(${Snow})`;
                  container.style.backgroundImage = `url(${Snow})`;
                  icon.innerHTML = `${<BsFillCloudSnowFill />}`
                } else if (description.includes("sunny")) {
                  document.body.style.backgroundImage = `url(${Sun})`;
                  container.style.backgroundImage = `url(${Sun})`;
                  icon.innerHTML = `${<FaSun />}`
                } else if (description.includes("wind")) {
                  document.body.style.backgroundImage = `url(${Windy})`;
                  container.style.backgroundImage = `url(${Windy})`;
                  icon.innerHTML = `${<WiCloudyWindy />}`
                } else if (description.includes("clouds")) {
                  document.body.style.backgroundImage = `url(${Cloudy})`;
                  container.style.backgroundImage = `url(${Cloudy})`;
                  icon.innerHTML = `${<BsCloudsFill />}`
                } else if (description.includes("sky")) {
                  document.body.style.backgroundImage = `url(${Sky})`;
                  container.style.backgroundImage = `url(${Sky})`;
                  icon.innerHTML = `${<IoSunny />}`
                } else if (
                  description.includes("haze") ||
                  description.includes("mist")
                ) {
                  document.body.style.backgroundImage = `url(${Mist})`;
                  container.style.backgroundImage = `url(${Mist})`;
                  icon.innerHTML = `${<IoCloudSharp />}`
                }
          }} catch (error) {
          console.error("Mistake fetching data", error);
        }
          
        }
        
        const hourlyForecast = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
             console.log("Dataaaaaaaa", data);
            setDailyForecastState(data.list);
        };
        const forecast5Day = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Response from API2:", data);
          const dailyForecast = groupByDay(data.list);
            setForecastState(dailyForecast);
        };
        hourlyForecast(
        `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${API_KEY}=metric`
        );
        currentWeather(
            `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${API_KEY}=metric`
        );
        forecast5Day(
            `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${API_KEY}=metric`
        );
    }, []);
    const groupByDay = (forecastData) => {
        const groupedData = {};
        forecastData.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!groupedData[date]) {
            groupedData[date] = {
              temperatures: [],
              weatherDescriptions: [],
            };
          }
          groupedData[date].temperatures.push(item.main.temp);
          groupedData[date].weatherDescriptions.push(item.weather[0].description);
          console.log("data", groupedData);
        });
    
        Object.keys(groupedData).forEach((date) => {
          const temperatures = groupedData[date].temperatures;
          const avgTemperatures =
            temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length;
          groupedData[date].averageTemperature = avgTemperatures.toFixed(2);
        });
    
        return groupedData;
    };
    const current_time = new Date().toISOString().split("T")[0];

  return (
    <main className="main h-[95vh] bg-black justify-center mt-4 items-center mx-4  bg-opacity-50  md:flex md:mt-20 md:mx-16 md:h-[80vh]">
      {weatherState !== null && weatherState !== undefined ? (
        <div className="py-1 px-6 h-full md:p-8">
          <div className="flex justify-around items-center">
            <Link to="/London">
              <div className="flex items-center border px-2 py-1 rounded-2xl text-white">
                <MdWhereToVote className="mr-1" />
                London
              </div>
            </Link>
            <Link to="">
            <div className="flex items-center border px-2 py-1 rounded-2xl text-white">
              <MdWhereToVote className="mr-1" /> Paris
            </div></Link>
            <Link to="/Munchen">
            <div className="flex items-center border px-2 py-1 rounded-2xl text-white">
              <MdWhereToVote className="mr-1" /> Munchen
            </div></Link>
            <div></div>
          </div>
          <div
            id="Munich"
            className="sub-container h-[87vh] bg-black bg-opacity-65 mt-1 p-3 rounded-2xl md:mt-3 md:h-[70vh]"
          >
            <div
              id="container_txt"
              className="mt-2 flex flex-col items-center md:h-[350px] md:justify-center md:mt-0"
            >
              <div id='icon'></div>
              <h1 className="text-3xl font-bold md:pb-3">
                {weatherState.main.temp} °C
              </h1>
              <h3 className="text-xl uppercase  font-bold">
                {weatherState.weather[0]?.description}
              </h3>
              <h4 className="font-normal flex text-center">
                Feels like {weatherState.main.feels_like} °C / Max:{" "}
                {weatherState.main.temp_max} °C / Min:{" "}
                {weatherState.main.temp_min} °C
              </h4>
            </div>
            <div className="flex text-white justify-around mt-5 md:mt-0">
              <div className="bg-black pb-3 pr-3 bg-opacity-50 rounded-lg md:pr-9 md:pb-9">
                <h4 className="flex text-sm items-center ml-2 text-gray-300 font-semibold md:text-base">
                  <MdOutlineVisibility size={18} className="mr-2" />
                  Visibility
                </h4>
                <h3 className="ml-2 text-base md:text-2xl font-semibold">
                  {weatherState.visibility} mi
                </h3>
              </div>
              <div className="bg-black pb-3 pr-3 bg-opacity-50 rounded-lg md:pr-9 md:pb-9">
                <h4 className="flex text-sm items-center ml-2 text-gray-300 font-semibold md:text-base">
                  <WiHumidity size={28} className="mr-1" />
                  Humidity
                </h4>
                <h3 className="ml-2 text-base md:text-2xl font-semibold">
                  {weatherState.main?.humidity} %
                </h3>
              </div>
            </div>
            <div className="flex text-white justify-around mt-5">
              <div className="bg-black pb-3 pr-3 bg-opacity-50 rounded-lg md:pr-10 md:pb-10">
                <h4 className="flex text-sm items-center ml-2 text-gray-300 font-semibold md:text-base">
                  <FaArrowDownShortWide size={20} className="mr-3" />
                  Pressure
                </h4>
                <h3 className="ml-2 text-base md:text-2xl font-semibold">
                  {weatherState.main?.pressure}
                </h3>
              </div>
              <div className="bg-black pb-3 pr-3 bg-opacity-50 rounded-lg md:pr-10 md:pb-10">
                <h4 className="flex text-sm items-center ml-2 text-gray-300 font-semibold md:text-base">
                  {" "}
                  <FaWind className="mr-2" /> Wind speed
                </h4>
                <h3 className="ml-2 text-base md:text-2xl font-semibold">
                  {weatherState.wind?.speed} Mph
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Mistake :( </p>
      )}
      <div className="">
        <div className="bg-black bg-opacity-55 my-5 rounded-2xl">
          <h3 className="text-[#0081a7] flex items-center p-2">
            Hourly Forecast
          </h3>
          <div className="flex border-t-[1px] border-gray-700">
            {dailyforecastState !== null
              ? dailyforecastState.map((forecast) => {
                  return forecast.dt_txt.includes(current_time) ? (
                    <div
                      key={forecast.dt}
                      className="my-3 mx-3 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-[#495057]"
                    >
                      <h4 className="text-sm text-white font-semibold">
                        {forecast.dt_txt.split(" ")[1]}
                      </h4>
                      <h5 className="text-xs text-[#0081a7]">
                        {forecast.weather[0].description}
                      </h5>
                      <h3 className="text-lg text-white font-semibold">
                        {forecast.main.temp} C
                      </h3>
                      <div id="icon"></div>
                    </div>
                  ) : null;
                })
              : null}
          </div>
        </div>
        <div>
          <div className="bg-black bg-opacity-55 my-5 rounded-2xl">
            <h3 className="text-[#0081a7] flex items-center p-2">
              5-Day forecast
            </h3>
            <div className="flex border-t-[1px] border-gray-700">
              {forecastState &&
                Object.keys(forecastState).map((date) => (
                  <div
                    key={date}
                    className="my-3 mx-3 p-3 rounded-lg flex flex-col justify-center items-center hover:bg-[#495057]"
                  >
                    <h4 className="text-sm text-white font-semibold">{date}</h4>
                    <h5 className="text-xs text-[#0081a7]">{forecastState[date].weatherDescriptions[4]}</h5>
                    <h3 className="text-lg text-white font-semibold">
                      {forecastState[date].averageTemperature} C
                    </h3>
                    <div id='icon'></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-100 h-80 bg-black bg-opacity-55 rounded-2xl p-2">
              <YMaps>
                <Map
                  defaultState={{
                    center: [36.305014665977076,-88.31997664559935],
                    zoom: 12,
                  }}
                                style={{ width: "600px", height: "300px" }}
                                className="ml-5"
                >
                  <Placemark
                    geometry={[36.305014665977076,-88.31997664559935]}
                    properties={{
                      hintContent: "London",
                      balloonContent: "Capital of Great Britain",
                    }}
                  />
                </Map>
              </YMaps>
          </div>
        </div> 
      </div>
    </main>
  )
}

export default Paris