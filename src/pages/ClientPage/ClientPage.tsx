import { useState } from "react";
import PlaneData from "../../data/companiesDetail.json";
import DatePicker from "react-datepicker";
import { PlaneCard } from "../../model/card.model";
import  FlightCard from "../../components/FlightCard/fligthCard"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"

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
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [startDate, setStartDate] = useState(new Date());

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "departure") {
            setSelectedDeparture(value);
            console.log("Selected Departure:", value);
        } else if (name === "destination") {
            setSelectedDestination(value);
            console.log("Selected Destination:", value);
        }
    };

    const handleButtonClick = () => {
        const queryBody = {
            startingAirport: selectedDeparture,
            destinationAirport: selectedDestination,
            departureDate: startDate,
        }
        axios.get('https://icanfly.cybonix.fr/api/flight/find', {params: queryBody})
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.error(error)
            }
        )
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
                    <button className="btn col-start-2 bg-first" onClick={handleButtonClick}>Search Flight</button>
                </div>
            <FlightCard flight={fakePlaneCard} />
            </div>
        </>
    )
}