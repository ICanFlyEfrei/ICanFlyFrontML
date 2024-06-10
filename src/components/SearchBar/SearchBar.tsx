import { useState } from "react";
import PlaneData from "../../data/companiesDetail.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import axios from 'axios'

interface PlaneOption {
    value: string;
    label: string;
}

export const SearchBar = (): JSX.Element => {

    const [selectedDeparture, setSelectedDeparture] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<string>("");
    const [selectedCompany, setSelectedCompany] = useState<string>("");
    const [startDate, setStartDate] = useState(new Date());
    const [selectedModel, setSelectedModel] = useState<string>("");

    const [options, setOptions] = useState<PlaneOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

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

    const handleButtonClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('weekday', startDate.getDay().toString());
        queryParams.append('startingAirport', selectedDeparture);
        queryParams.append('destinationAirport', selectedDestination);
        queryParams.append('segmentsAirlineName', selectedCompany);
        queryParams.append('segmentsEquipmentDescription', selectedModel.length.toString());

        console.log(`query : http://localhost:5000/predict?${queryParams.toString()}`)
        axios.post(`http://localhost:5000/predict?${queryParams.toString()}`)
            .then(response => {
                console.log('Response:', response.data);
                // Handle response data here
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });
    };

    return (
        <div>
            <select name="departure" onChange={onChange}>
                <option value={undefined} > choisissez un départ</option>
                {Object.entries(PlaneData.airports).map(([airport, value]) => (
                        <option value={airport}>{airport}</option>
                    ))}
            </select>
            <select name="destination" onChange={onChange}>
                <option value={undefined} > choisissez une destination</option>
                {Object.entries(PlaneData.airports).map(([airport, value]) => (
                        <option value={airport}>{airport}</option>
                    ))}
            </select>


            <select name="companies" onChange={onChange}>
                <option value={undefined} > choisissez une companie</option>
                {Object.entries(PlaneData.companies).map(([company, value]) => (
                        <option value={company}>{company}</option>
                    ))}
            </select>


            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />

            <Select
                options={options}
                isLoading={loading}
                onInputChange={handleInputChange}
                onChange={handleChange}
                inputValue={inputValue}
                placeholder="Search for a plane model"
            />

            <button onClick={handleButtonClick}>Send Data</button>
        </div>
    )
}
