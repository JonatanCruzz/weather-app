const WeatherStats = ({ icon, unit, value }) => {

    return (
        <div className="flex gap-1 items-center">
            <img src={icon} alt="" className="" />
            <span>{value}{unit}</span>
        </div>
    )
}
export default WeatherStats