import { useState } from "react";
import { PlaneCardUpdate } from "../../model/cardUpdate.model";
import { CardUpdate } from '../../components/FlightCard/CardUpdate'
import PlaneData from "../../data/companiesDetail.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../utils/axiosInstance.utils";


function generateFakePlaneCard(): PlaneCardUpdate {
    const planeCard: PlaneCardUpdate = {
        flightNumber: "1",
        segmentAirlineName: "Air France",
        departureTime: new Date('2024-07-01T10:00:00Z'),
        arrivalTime: new Date('2024-07-01T14:00:00Z'),
        startingAirport: "New York",
        destinationAirport: "Paris",
        price: 500,
        segmentEquipmentDescription: "Boeing 747",
        numberOfSeats: 250,
        status: "Scheduled"

    };

    return planeCard;
}

// Generate an example PlaneCard
const fakePlaneCard: PlaneCardUpdate = generateFakePlaneCard();


export const UpdatePage = (): JSX.Element => {

    const [selectedDeparture, setSelectedDeparture] = useState<string>("");
    const [selectedDepartureName, setSelectedDepartureName] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [selectedDestinationName, setSelectedDestinationName] = useState<string>("");


    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new String());
    const [flight, setFlight] = useState<PlaneCardUpdate[]>();

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
        const { name, value } = event.target;
        setStartTime(value)
        console.log("Start time setted to :", value)
    }

    const handleButtonClick = () => {
        startDate.setUTCHours(Number(startTime.substr(0,2)))
        startDate.setUTCMinutes(Number(startTime.substr(3,2)))

        axiosInstance.get(`/flight?startingAirport=${encodeURI(selectedDepartureName)}&destinationAirport=${encodeURI(selectedDestinationName)}&departureTime=${startDate.toISOString()}`)
            .then(response => {
                console.log(response.data)
                setFlight(response.data)
            }).catch(error => {
                console.error(error)
            }
        )
    };


    return (
        <div className="flex flex-col items-center p-7"  >
            <div className="grid grid-cols-3 gap-4 w-3/4 border mb-5">
                <select className="select" name="departure" onChange={onChange}>
                    <option value={undefined} > choisissez un départ</option>
                    {Object.entries(PlaneData.airports).map(([airport, value]) => (
                        <option value={value}>{airport}</option>
                    ))}
                </select>
                <select className="select" name="destination" onChange={onChange}>
                    <option value={undefined} > choisissez une destination</option>
                    {Object.entries(PlaneData.airports).map(([airport, value]) => (
                        <option value={value}>{airport}</option>
                    ))}
                </select>
            </div>

            <div className="pl-11 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Date:</label>
                <div className="flex flex-row">
                    <DatePicker className="select mr-3" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input onChange={handleDateChange} type="time" name="start-time" className="select  border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button className="btn mr-16 bg-first w-1/6" onClick={handleButtonClick}>Send Data</button>
            <div className="w-full">
                <CardUpdate flight={fakePlaneCard} />
            </div>
        </div>
    );
};