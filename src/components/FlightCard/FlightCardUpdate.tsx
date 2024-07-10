import { useState } from 'react';
import { PlaneCardUpdate } from '../../model/cardUpdate.model';
import PlaneData from "../../data/companiesDetail.json";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


interface FlightCardProps {
    flight: PlaneCardUpdate;
}
interface PlaneOption {
    value: string;
    label: string;

}

export const FlightCardUpdate = ({ flight }: FlightCardProps): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);
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


    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };


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
        if (name === "start-time"){
            setStartTime(value)
            console.log("Start time setted to :", value)
        }
        else if (name === "end-time"){
            setEndTime(value)
            console.log("Ebd time setted to", value)
        }
    }

    const HandleSaveButton = () => {
        startDate.setHours(Number(startTime.substr(0,2)))
        startDate.setMinutes(Number(startTime.substr(3,2)))

        endDate.setHours(Number(endTime.substr(0,2)))
        endDate.setMinutes(Number(endTime.substr(3,2)))

        const updatedFlight: PlaneCardUpdate = {
            flightNumber: flight.flightNumber,
            departureTime: startDate,
            arrivalTime: endDate,
            startingAirport: selectedDeparture,
            destinationAirport: selectedDestination,
            segmentAirlineName: selectedCompany,
            segmentEquipmentDescription: selectedModel,
            numberOfSeats: 150,
            price : flight.price,
            status: flight.status
        }

        axios.patch(`http://${import.meta.env.VITE_SERVER}/api/flight/update`, updatedFlight)
            .then(response => {
                console.log("response", response)
            }).catch(error => {
                console.error(error)
            })
    }

    return (
        <>
            <div className="card w-full flex items-center">
                <div className='card-body hover:bg-fourth  bg-third sm:w-3/5 w-full rounded-xl border-r-4 border-t-4 border-l-2 border-b-2'>
                    <div className='flex sm:flex-row flex-col justify-between'>
                        {isEditing ? (
                                 <select className="select bg-transparent font-bold border-b-2 border-black" name="companies" onChange={onChange}>
                                 <option value={undefined} > choisissez une companie</option>
                                 {Object.entries(PlaneData.companies).map(([company, value]) => (
                                     <option value={value}>{company}</option>
                                 ))}
                             </select>
                        ) : (
                            <h2 className="card-title text-3xl text-fifth font-bold">{flight.segmentAirlineName}</h2>
                        )}
                        {isEditing ? (
                                    <Select
                                    options={options}
                                    isLoading={loading}
                                    onInputChange={handleInputChange}
                                    onChange={handleChange}
                                    inputValue={inputValue}
                                    placeholder="Search for a plane model"
                                    className= "rounded-md w-3/4 mb-5"
                                />
                        ) : (
                            <h2 className="card-title text-xl text-left mr-8 text-black font-bold">{flight.segmentEquipmentDescription}</h2>
                        )}
                    </div>
                    <div className='grid grid-cols-3 grid-rows-2'>
                        <div className='sm:row-span-2 row-star-0 col-span-1'>
                            {isEditing ? (
                                <>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Date:</label>
                                    <div className="flex flex-col gap-2">
                                        <DatePicker className="select bg-transparent border-b-2 border-black mr-3" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                                        <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 ">
                                            <div>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                    <input onChange={handleDateChange} type="time" name="start-time" className=" min-w-24 border-black border-b-2 bg-transparent select border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className='sm:text-2xl text-sm text-black font-bold'>{flight.departureTime.getDate()}/{flight.departureTime.getMonth()}/{flight.departureTime.getFullYear()}</p>
                                    <p className="sm:text-2xl text-sm text-black font-bold">{flight.departureTime.getHours()} : { (flight.departureTime.getMinutes() < 10 ? '0' : '') + flight.departureTime.getMinutes() } : {(flight.departureTime.getSeconds() < 10 ? '0' : '') + flight.departureTime.getSeconds()}</p>
                                </>
                            )}
                            {isEditing ? (
                                  <select className="select bg-transparent border-b-2 border-black mt-2" name="departure" onChange={onChange}>
                                  <option value={undefined} > choisissez un départ</option>
                                  {Object.entries(PlaneData.airports).map(([airport, value]) => (
                                      <option value={value}>{airport}</option>
                                  ))}
                              </select>
                            ) : (
                                <p className="sm:text-2xl text-sm text-black font-bold">{flight.destinationAirport}</p>
                            )}
                        </div>
                        <div className='sm:row-span-2 row-start-2 sm:col-span-1'>
                            {isEditing ? (
                                <>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Arrival date:</label>
                                    <div className="flex flex-col gap-2">
                                        <DatePicker className="select mr-3 bg-transparent border-b-2 border-black" selected={endDate} onChange={(date: Date) => setEndDate(date)} />
                                        <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                                        </svg>
                                                    </div>
                                                    <input onChange={handleDateChange} type="time" name="end-time" className=" min-w-24 border-black border-b-2 bg-transparent select border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className='sm:text-2xl text-sm text-black font-bold'>{flight.arrivalTime.getDate()}/{flight.arrivalTime.getMonth()}/{flight.arrivalTime.getFullYear()}</p>
                                    <p className="sm:text-2xl text-sm text-black font-bold">{flight.arrivalTime.getHours()} : {(flight.arrivalTime.getMinutes() < 10 ? '0' : '') + flight.arrivalTime.getMinutes() } : {(flight.arrivalTime.getSeconds() <  10 ? '0' : '') + flight.arrivalTime.getSeconds()} </p>
                                </>
                            )}
                            {isEditing ? (
                                    <select className="select mt-2 bg-transparent border-b-2 border-black" name="destination" onChange={onChange}>
                                    <option value={undefined} > choisissez une destination</option>
                                    {Object.entries(PlaneData.airports).map(([airport, value]) => (
                                        <option value={value}>{airport}</option>
                                    ))}
                                </select>
                            ) : (
                                <p className="sm:text-2xl text-sm text-black font-bold">{flight.destinationAirport}</p>
                            )}
                        </div>
                        <div className='justify-center items-center flex sm:row-span-1 row-start-3 col-span-1'>
                            <button
                                className="btn btn-square align-middle bg-white text-first flex flex-1 w-full max-w-48"
                                onClick={toggleEditMode}
                            >
                                {isEditing ? 'save' : 'update'}
                            </button>
                        </div>
                        <div className='col-span1 sm:row-span-1 row-start-3 flex justify-center items-center'>
                            {/* {isEditing ? (
                                <input
                                    type="number"
                                    name="price"
                                    value={editedFlight.price}
                                    onChange={handleInputChange}
                                    className="sm:text-2xl text-sm font-bold ml-5 text-white text-center justify-center"
                                />
                            ) : (
                            )} */}
                            <p className="sm:text-2xl text-sm font-bold ml-5 text-white text-center justify-center">Price: {flight.price} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
