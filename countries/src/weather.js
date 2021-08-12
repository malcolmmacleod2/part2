import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({city}) => {

    const [weather, setWeather] = useState({})
    const weather_stack_api_key = process.env.REACT_APP_WEATHER_STACK_API_KEY

    const hook = () => {
        console.log('effect')

        axios
        .get(`http://api.weatherstack.com/current?access_key=${weather_stack_api_key}&query='${city}'`)
        .then(response => {
            console.log('promise fulfilled')
            console.log(response.data)
            setWeather(response.data)
        })
    }

    useEffect(hook, [city, weather_stack_api_key])

    if (!weather.current) {
        return (
            <div>
                <h3>Weather in {city} unavailable</h3>
            </div>
        )
    }
    return (
        <div>
            <h3>Weather in {city}</h3>

            <p>Temperature: {weather.current.temperature} Celsius</p>
            <p>Wind: {weather.current.wind_speed} direction {weather.current.wind_dir}</p>
            <img alt={weather.current.weather_descriptions[0]} width="100" height="100" src={weather.current.weather_icons[0]} />
        </div>
    )
}

export default Weather