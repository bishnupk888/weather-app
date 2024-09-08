import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import './forecaste.css'

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();

  const forecastDays = weekDays
    .slice(dayInWeek)
    .concat(weekDays.slice(0, dayInWeek));
  console.log(dayInWeek);
  console.log("forecastDays ==>", forecastDays);
  return (
    <>
      <div className="title">Daily Forecast</div>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="weather"
                    className="icon-small"
                  />
                  <label htmlFor="" className="day">{forecastDays[index]}</label>
                  <label htmlFor="" className="description">{item.weather[0].description}</label>
                  <label htmlFor="" className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>


                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="daily-deatails-grid">
                  <div className="daily-deatails-grid-item">
                      <label>Pressure</label>
                      <label>{item.main.pressure}hPa</label>
                  </div>
                  <div className="daily-deatails-grid-item">
                      <label>Humidity</label>
                      <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-deatails-grid-item">
                      <label>Clouds</label>
                      <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-deatails-grid-item">
                      <label>Wind Speed</label>
                      <label>{item.wind.speed}m/s</label>
                  </div>
                  <div className="daily-deatails-grid-item">
                      <label>Sea Level</label>
                      <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-deatails-grid-item">
                      <label>Feels Like</label>
                      <label>{item.main.feels_like}°C</label>
                  </div>
                    
                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
