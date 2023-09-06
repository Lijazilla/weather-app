import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import dizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

import React from 'react';
import { useState } from 'react';
import './wheather-app.css';

const WheatherApp = () => {

    let api_key = "44e0e740228ff0500e77a0bb3bad3f12";

    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value===""){
            return 0
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate")
        const temprature = document.getElementsByClassName("wheather-temp");
        const location = document.getElementsByClassName("wheather-location");

        if (data && data.main && data.main.humidity) {
            humidity[0].innerHTML = data.main.humidity + " %";
          } else {
            humidity[0].style.display = "none";
          } 
        
        if (data && data.main && data.wind.speed) {
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        } else {
        wind[0].style.display = "none";
        }
        
        if (data && data.main && data.main.temp) {
            temprature[0].innerHTML = Math.floor(data.main.temp) + " °c";
          } else {
            temprature[0].style.display = "none";
          }

        if (data && data.name) {
        location[0].innerHTML = data.name;
        } else {
        location[0].style.display = "none";
        }

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(dizzle_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(dizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
        
    }

    return(
        <section className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Type your city'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={search_icon} alt='search Icon'/>
                </div>
            </div>
            <div className='wheather-image'>
                <img src={wicon} alt='cloud icon'/>
            </div>
            <div className='wheather-temp'>24°C</div>
            <div className='wheather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon'/>
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon'/>
                    <div className='data'>
                        <div className='wind-rate'>18 km/h</div>
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WheatherApp;