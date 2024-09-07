
import './currentWeather.css' 

const CurrentWeather = () => {
  return (
    <div className='weather'>
        <div className='top'>
            <div>
            <p className='city'>Kochi</p>
            <p className='weather-description'>sunny</p>
            </div>
        <img src="icons/01d.png" alt="weather" className='weather-icon' />
        </div>
        <div className='bottom'>
            <p className='temperature'>30C</p>
            <div className='details '>
                <div className='parameter-row'>
                    <span className='parameter-label'>Details</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Feels Like</span>
                    <span className='parameter-value'>10m/s</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Wind</span>
                    <span className='parameter-value'>28</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Humidity</span>
                    <span className='parameter-value'>5%</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Pressure</span>
                    <span className='parameter-value'>25 hPa</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CurrentWeather