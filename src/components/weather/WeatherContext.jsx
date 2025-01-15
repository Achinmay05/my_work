import React, { useState, useEffect } from 'react'
import Wind from '../../assets/wind.png'
import Cal from '../../assets/cal.png'
import Loc from '../../assets/loc.png'
import SS from '../../assets/ss.png'
import SR from '../../assets/sr.png'
import P from '../../assets/p.png'
import H from '../../assets/h.png'
import Vl from '../../assets/vl.png'
import V from '../../assets/v.png'
import T from '../../assets/t.png'

export default function WeatherContext() {

    const [city, setCity] = useState("");
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [weather, setWeather] = useState(
        {
            coord: { lon: 0, lat: 0 },
            weather: [
                {
                    id: 0,
                    main: "Haze",
                    description: "",
                    icon: "50d"
                }
            ],
            base: "",
            main: {
                temp: 295,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
                pressure: 0,
                humidity: 0,
                sea_level: 0,
                grnd_level: 0
            },
            visibility: 0,
            wind: {
                speed: 0,
                deg: 0,
                gust: 0
            },
            clouds: {
                all: 0
            },
            dt: 0,
            sys: {
                sunrise: 0,
                sunset: 0
            },
            timezone: 0,
            id: 0,
            name: "",
            cod: 0
        }
    );
    const [data, setData] = useState({
        country: "____",
        lat: 0.0,
        lon: 0.0,
        name: "_____",
        state: "_____",
    });
    const [pollution, setPollution] = useState({
        coord: {
            lon: 0,
            lat: 0
        },
        list: [
            {
                main: {
                    aqi: 1
                },
                components: {
                    co: 0,
                    no: 0,
                    no2: 0,
                    o3: 0,
                    so2: 0,
                    pm2_5: 0,
                    pm10: 0,
                    nh3: 0
                },
                dt: 0
            }
        ]
    });
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const aqi = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]

    const throughCity = async () => {
        await fetchGeoData(city);
        await fetchAirPollutionData(data.lat,data.lon);
        await fetchWeather(data.lat, data.lon);
    }

    const fetchGeoData = async (city) => {
        try {

            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3dbf77ba1fd74bdaa3037b6136a645dc`
            );
            const result = await response.json();
            if (result && result.length > 0) {
                setData(result[0]);
            } else {
                // setError("No data found");
            }
        } catch (err) {
            // setError("Failed to fetch data");
        } finally {
            // setLoading(false);
        }
    };

    const fetchAirPollutionData = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=3dbf77ba1fd74bdaa3037b6136a645dc`
            );
            const result = await response.json();
            setPollution(result);
            //   console.log(unixConvert(pollution.dt).toLocaleString());
        } catch (err) {
        } finally {
        }
    };

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3dbf77ba1fd74bdaa3037b6136a645dc`
            );
            const result = await response.json();
            setWeather(result);
            console.log(weather);

        } catch (err) {
        } finally {
        }
    };

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            }
        );
    },[location, weather, pollution, data, city]);

    const getCurrentLocation = async () => {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            }
        );
        await fetchWeather(location.lat, location.lon);
        await fetchAirPollutionData(location.lat, location.lon);
        await fetchGeoData(weather.name);
        
    };

    const unixConvert = (data) => {
        return new Date(data * 1000);
    };

    return (
        <div className='w-full h-[98%] overflow-y-auto flex flex-col sm:flex-row text-white'>
            <div className='sm:w-[30%] w-full h-auto flex flex-col'>
                <div className="w-full h-auto pl-2 pr-2 pb-0 mb-0 text-9xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">WEA</div>
                <div className="w-full h-auto pl-1 pr-1 pt-0 mt-0 mb-1 text-8xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800">THER</div>
                <div className='w-full h-auto flex justify-between'>
                    <input
                        type="text"
                        id="input"
                        value={city}
                        onChange={handleInputChange}
                        placeholder="Enter the city"
                        className="w-2/3 h-10 text-sm hover:shadow-red-500 shadow-lg text-gray-200 bg-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <div onClick={throughCity} className='pt-2 pb-2 font-extrabold pl-3 pr-3 text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold'>SEARCH</div>
                </div>
                <div onClick={getCurrentLocation} className='p-2 mt-2 flex items-center justify-center w-full text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold'>CURRENT LOCATION</div>
                <div className='w-full h-[20px]'></div>
                <div className='w-full h-[200px] relative rounded'>
                    <div className='w-full h-full bg-gray-500 absolute opacity-40 rounded'></div>
                    <div className='w-full p-2 h-full flex flex-col rounded relative shadow-lg hover:shadow-red-400'>
                        <div className='font-bold opacity-60 absolute tracking-normal hover:tracking-wider transition-all duration-300 text-2xl h-full hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Now</div>
                        <h2 className="text-white absolute mt-12 pointer-events-none">{(weather.main.temp - 273).toFixed(2)}&deg;C</h2>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="absolute ml-36 w-[60%] sm:mt-[-30px] mt-0 pointer-events-none" alt="" />
                        <img src={Cal} className="mt-28 absolute w-[5%] pointer-events-none" alt="" />
                        <div className='text-white text-sm mt-[140px] ml-7'>{data.name} <br /> {data.state}  {data.country}</div>
                        <div className='text-white text-sm mt-[-67px] ml-7'>{day} / {month} / {year}</div>
                        <div className='text-white text-xl mt-[20px] sm:ml-64 ml-56'>{weather.weather[0].main}</div>
                        <img src={Loc} className="mt-36 absolute w-[5%] pointer-events-none" alt="" />
                    </div>
                </div>
            </div>
            <div className='sm:w-[2%] w-full sm:h-full h-16'></div>
            <div className='sm:w-[78%] w-full h-auto sm:sm:h-full flex flex-col items-center justify-center'>
                <div className='font-bold text-3xl h-[55px] w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>
                    Today's Highlights
                </div>
                <div className='w-full h-auto flex flex-col sm:flex-row mb-3 sm:mb-0'>
                    <div className='w-full sm:w-[49%] h-[300px] relative rounded'>
                        <div className='w-full h-full bg-gray-500 absolute opacity-40 rounded'></div>
                        <div className='w-full p-2 h-full relative rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full flex items-start justify-between tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>
                                Air Quality Index
                                <div className='mr-5 w-auto h-auto p-1 bg-white text-black rounded-lg'>{aqi[pollution.list[0].main.aqi-1]}</div>
                            </div>
                            <div className='w-full h-full pt-5 flex flex-col sm:flex-row items-center justify-center'>
                                <img src={Wind} className=" w-[18%] sm:[20%]" alt="" />
                                <div className="sm:w-[10%] w-full sm:h-full h-2"></div>
                                <div className='w-full h-[190px] sm:w-[70%] sm:h-48 grid grid-cols-4 gap-4'>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">CO</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.co}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">NO</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.no}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">PM2.5</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.pm2_5}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">NO2</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.no2}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">O3</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.o3}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">PM10</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.pm10}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">SO2</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.so2}</div>
                                    </div>
                                    <div className="w-14 h-20 flex flex-col items-center justify-between">
                                        <div className="sm:text-3xl text-xl">NH3</div>
                                        <div className="text-lg text-gray-500">{pollution.list[0].components.nh3}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sm:w-[1%] w-full sm:h-full h-10'></div>
                    <div className='w-full sm:w-[49%] h-[300px] relative rounded'>
                        <div className='w-full h-full bg-gray-500 absolute opacity-40 rounded'></div>
                        <div className='w-full p-2 h-full relative rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Sunrise & Sunset</div>
                            <div className="flex items-end justify-center h-full w-full">
                                <div className="w-[45%] h-[70%] sm:h-[80%] flex flex-col items-center justify-between">
                                    <img src={SR} className="w-2/3" alt="" />
                                    <div className="text-3xl">SUNRISE</div>
                                    <div className="text-xl text-gray-500">{unixConvert(weather.sys.sunrise).toLocaleTimeString()}</div>
                                </div>
                                <div className="w-[45%] h-[70%] sm:h-[80%] flex flex-col items-center justify-between">
                                    <img src={SS} className="w-3/5" alt="" />
                                    <div className="text-3xl">SUNSET</div>
                                    <div className="text-xl text-gray-500">{unixConvert(weather.sys.sunset).toLocaleTimeString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="sm:w-[98%] w-full sm:h-[150px] h-[350px] grid sm:grid-cols-5 grid-cols-2 gap-4">
                    <div className='relative rounded'>
                        <div className='bg-gray-500 w-full h-full absolute opacity-40 rounded'></div>
                        <div className='p-2 relative w-full h-full rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Humidity</div>
                            <div className="w-full mt-2 sm:mt-0 h-full flex items-center justify-between">
                                <img src={H} className="w-10" alt="" />
                                <div className="flex text-3xl items-center justify-center">
                                    {weather.main.humidity} %
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative rounded'>
                        <div className='bg-gray-500 w-full h-full absolute opacity-40 rounded'></div>
                        <div className='p-2 relative w-full h-full rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Wind Speed</div>
                            <div className="w-full mt-2 sm:mt-0 h-full flex items-center justify-between">
                                <img src={Vl} className="w-10" alt="" />
                                <div className="flex text-2xl items-center justify-center">
                                    {weather.wind.speed} m/s
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative rounded'>
                        <div className='bg-gray-500 w-full h-full absolute opacity-40 rounded'></div>
                        <div className='p-2 relative w-full h-full rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Pressure</div>
                            <div className="w-full mt-2 sm:mt-0 h-full flex items-center justify-between">
                                <img src={P} className="w-10" alt="" />
                                <div className="flex text-2xl items-center justify-center">
                                    {weather.main.pressure} hPa
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative rounded'>
                        <div className='bg-gray-500 w-full h-full absolute opacity-40 rounded'></div>
                        <div className='p-2 relative w-full h-full rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Visibility</div>
                            <div className="w-full mt-2 sm:mt-0 h-full flex items-center justify-between">
                                <img src={V} className="w-10" alt="" />
                                <div className="flex text-3xl items-center justify-center">
                                    {weather.visibility/1000} km
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative rounded'>
                        <div className='bg-gray-500 w-full h-full absolute opacity-40 rounded'></div>
                        <div className='p-2 relative w-full h-full rounded shadow-lg hover:shadow-red-400'>
                            <div className='font-bold absolute opacity-60 text-xl h-full tracking-normal hover:tracking-wider transition-all duration-300 hover:text-red-500 pl-1 w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500'>Feels Like</div>
                            <div className="w-full mt-2 sm:mt-0 h-full flex items-center justify-between">
                                <img src={T} className="w-10" alt="" />
                                <div className="flex text-2xl items-center justify-center">
                                    {(weather.main.feels_like-273).toFixed(2)}&deg;C
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}