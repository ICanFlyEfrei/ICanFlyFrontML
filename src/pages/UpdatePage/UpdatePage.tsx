import { useState } from "react";
import { PlaneCardUpdate } from "../../model/cardUpdate.model";
import { FlightCardUpdate} from "../../components/FlightCard/FlightCardUpdate"
import PlaneData from "../../data/companiesDetail.json";
import DatePicker from "react-datepicker"   ;
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios'

interface PlaneOption {
    value: string;
    label: string;

}

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
        status: "Schedulled"

    };

    return planeCard;
}

// Generate an example PlaneCard
const fakePlaneCard: PlaneCardUpdate = generateFakePlaneCard();


export const UpdatePage = ():JSX.Element => {

    const [selectedDeparture, setSelectedDeparture] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [selectedCompany, setSelectedCompany] = useState<string>("");

    const [selectedModel, setSelectedModel] = useState<string>("");
    const [options, setOptions] = useState<PlaneOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new String());
    const [endTime, setEndTime] = useState(new String());


    const [prediction, setPrediction] = useState<number>(0)

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "departure") {
            setSelectedDeparture(value);
            console.log("Selected Departure:", value);
        } else if (name === "destination") {
            setSelectedDestination(value);
            console.log("Selected Destination:", value);
        } else if (name === "companies"){
            setSelectedCompany(value)
            console.log("Selected Company:", value);
        }
    };

    const filterOptions = async (inputValue: string): Promise<PlaneOption[]> => {
        const planes = PlaneData.planes;
        const filteredOptions: PlaneOption[] = Object.keys(planes)
            .filter(plane => plane.toLowerCase().includes(inputValue.toLowerCase()))
            .map(plane => ({
                value: plane,
                label: plane
            }));
        return filteredOptions;
    };

    const handleChange = (selectedOption: PlaneOption | null) => {
        if (selectedOption) {
            setSelectedModel(selectedOption.value);
        }
    };

    const handleInputChange = (inputValue: string) => {
        setInputValue(inputValue);
        loadOptions(inputValue);
    };

    const loadOptions = async (inputValue: string) => {
        setLoading(true);
        const filteredOptions = await filterOptions(inputValue);
        setOptions(filteredOptions);
        setLoading(false);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setStartTime(value)
        console.log("Start time setted to :", value)
    }

    const handleButtonClick = () => {
        //implement new call to endpoint here

        // const queryParams = new URLSearchParams();
        // queryParams.append('weekday', startDate.getDay().toString());
        // queryParams.append('startingAirport', selectedDeparture);
        // queryParams.append('destinationAirport', selectedDestination);
        // queryParams.append('segmentsAirlineName', selectedCompany);
        // queryParams.append('segmentsEquipmentDescription', selectedModel.length.toString());

        // console.log(`query : http://localhost:5000/predict?${queryParams.toString()}`)
        // axios.get(`http://localhost:5000/predict?${queryParams.toString()}`)
        //     .then(response => {
        //         console.log('Response:', response.data);
        //         setPrediction(response.data.prediction)
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         // Handle error here
        //     });
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
                <select className="select" name="companies" onChange={onChange}>
                    <option value={undefined} > choisissez une companie</option>
                    {Object.entries(PlaneData.companies).map(([company, value]) => (
                        <option value={value}>{company}</option>
                    ))}
                </select>
            </div>

            <Select
                options={options}
                isLoading={loading}
                onInputChange={handleInputChange}
                onChange={handleChange}
                inputValue={inputValue}
                placeholder="Search for a plane model"
                className= "rounded-md w-3/4 mb-5"
            />

            <div className="pl-11 mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Date:</label>
                <div className="flex flex-row">
                    <DatePicker className="select mr-3" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
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
                </div>
            </div>
            <button className="btn mr-16 bg-first w-1/6" onClick={handleButtonClick}>Send Data</button>
            <FlightCardUpdate flight={fakePlaneCard} />
        </div>
    );
};