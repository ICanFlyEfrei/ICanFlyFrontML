import { useState } from "react";
import PlaneData from "../../data/companiesDetail.json";
import DatePicker from "react-datepicker";
import { PlaneCard } from "../../model/card.model";
import  FlightCard from "../../components/FlightCard/fligthCard"
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../utils/axiosInstance.utils";

// Function to generate fake data
function generateFakePlaneCard(): PlaneCard {
    const planeCard: PlaneCard = {
        flightNumber: "1",
        segmentAirlineName: "Air France",
        departureTime: new Date('2024-07-01T10:00:00Z'),
        arrivalTime: new Date('2024-07-01T14:00:00Z'),
        startingAirport: "New York",
        destinationAirport: "Paris",
        segmentEquipmentDescription: "Airbus A380",
        numberOfSeats:300,
        status: "Schedulled",
        price: 500
    };

    return planeCard;
}

// Generate an example PlaneCard
const fakePlaneCard: PlaneCard = generateFakePlaneCard();

export const ClientPage = ():JSX.Element => {
    const [selectedDeparture, setSelectedDeparture] = useState<string>("");
    const [selectedDepartureName, setSelectedDepartureName] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [selectedDestinationName, setSelectedDestinationName] = useState<string>("");
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new String());

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const valueAsNumber = Number(value);
        if (name === "departure") {
            const airportname = Object.entries(PlaneData.airports).find(([airport, val]) => val === valueAsNumber)?.[0] || "";
            setSelectedDeparture(value);
            setSelectedDepartureName(airportname)
        } else if (name === "destination") {
            const airportname = Object.entries(PlaneData.airports).find(([airport, val]) => val === valueAsNumber)?.[0] || "";
            setSelectedDestination(value);
            setSelectedDestinationName(airportname)
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        if (name === "start-time"){
            setStartTime(value)
            console.log("Start time setted to :", value)
            console.log("hours", (Number(value.substr(3,2))))
        }
    }

    const handleButtonClick = () => {
        startDate.setUTCHours(Number(startTime.substr(0,2)))
        startDate.setMinutes(Number(startTime.substr(3,2)))
        console.log(startDate)

        // const date = new Date('July 12, 2024 00:00:00')
        // startDate.setMinutes(Number(startTime.substr(3,2)))
        // console.log(date.toISOString())
        axiosInstance.get(`/flight?startingAirport=${encodeURI(selectedDepartureName)}&destinationAirport=${encodeURI(selectedDestinationName)}&departureTime=${startDate.toISOString()}`)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.error(error)
        })
    };


    return (
        <>
            <div className="flex flex-col items-center flex-1 justify-center ">
                <div className="grid grid-cols-3 gap-4 w-3/5 é rounded-lg p-10 mb-9">
                    <select name="departure" onChange={onChange} className="select">
                        <option value={undefined} > choisissez un départ</option>
                        {Object.entries(PlaneData.airports).map(([airport, value]) => (
                            <option value={value}>{airport}</option>
                        ))}
                    </select>
                    <select name="destination" onChange={onChange} className="select">
                        <option value={undefined} > choisissez une destination</option>
                        {Object.entries(PlaneData.airports).map(([airport, value]) => (
                            <option value={value}>{airport}</option>
                        ))}
                    </select>

                    <DatePicker className="select" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <input onChange={handleDateChange} type="time" name="start-time" className="select  border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                            </div>
                        </div>
                    </form>
                    <button className="btn col-start-2 bg-first" onClick={handleButtonClick}>Search Flight</button>
                </div>
            <FlightCard flight={fakePlaneCard} />
            </div>
        </>
    )
}