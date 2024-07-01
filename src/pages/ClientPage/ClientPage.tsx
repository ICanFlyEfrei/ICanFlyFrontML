import { useState } from "react";
import PlaneData from "../../data/companiesDetail.json";
import { Header } from "../../components/Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"

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
        const queryParams = new URLSearchParams();
        queryParams.append('weekday', startDate.getDay().toString());
        queryParams.append('startingAirport', selectedDeparture);
        queryParams.append('destinationAirport', selectedDestination);


        alert('send to the right endopoint')
        // console.log(`query : http://localhost:5000/predict?${queryParams.toString()}`)
        // axios.get(`http://localhost:5000/predict?${queryParams.toString()}`)
        //     .then(response => {
        //         console.log('Response:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    };

    return (
        <>
            {/* <Header/> */}

            <div className="flex flex-col items-center">
                <div className="grid grid-cols-3 gap-4 w-3/5">
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

                    <DatePicker className="btn" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    <button className="btn col-start-2" onClick={handleButtonClick}>Search Flight</button>
                </div>
            </div>
        </>
    )
}