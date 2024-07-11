import PlaneData from "../../data/companiesDetail.json";
import { PlaneCardUpdate } from '../../model/cardUpdate.model';



interface FlightCardProps {
    flight: PlaneCardUpdate;
    editFunc: (value: boolean) => void;
}




export const FlightCardPreUpdate = ({ flight, editFunc }: FlightCardProps): JSX.Element => {
    return (
        <>
            <div className="card w-full flex items-center">
                <div className='card-body hover:bg-fourth  bg-third sm:w-3/5 w-full rounded-xl border-r-4 border-t-4 border-l-2 border-b-2'>
                    <div className="flex flex-row justify-between">
                        <h2 className="card-title text-3xl text-fifth font-bold">{flight.segmentAirlineName}</h2>
                        <h2 className="card-title text-xl text-left mr-8 text-black font-bold">{flight.segmentEquipmentDescription}</h2>
                    </div>
                    <div className='grid grid-cols-3 grid-rows-2'>
                        <div className='xl:row-span-2 r col-span-1'>
                            <p className='sm:text-2xl text-sm text-black font-bold'>{flight.departureTime.getDate()}/{flight.departureTime.getMonth()}/{flight.departureTime.getFullYear()}</p>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.departureTime.getHours()} : {(flight.departureTime.getMinutes() < 10 ? '0' : '') + flight.departureTime.getMinutes()} : {(flight.departureTime.getSeconds() < 10 ? '0' : '') + flight.departureTime.getSeconds()}</p>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.startingAirport}</p>
                        </div>
                        <div className='row-span-2  col-span-1'>
                            <p className='sm:text-2xl text-sm text-black font-bold'>{flight.arrivalTime.getDate()}/{flight.arrivalTime.getMonth()}/{flight.arrivalTime.getFullYear()}</p>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.arrivalTime.getHours()} : {(flight.arrivalTime.getMinutes() < 10 ? '0' : '') + flight.arrivalTime.getMinutes()} : {(flight.arrivalTime.getSeconds() < 10 ? '0' : '') + flight.arrivalTime.getSeconds()} </p>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.destinationAirport}</p>
                        </div>
                        <div className='justify-center flex   items-center row-span-1 col-span-1'>
                            <button
                                className="btn btn-square align-middle bg-white text-first flex flex-1 w-full max-w-48"
                                onClick={() => editFunc(true)}
                            >
                                Edit Flight
                            </button>
                        </div>
                        <div className='col-span-1 row-span-1 w-full  flex justify-center items-center'>
                            <p className="sm:text-2xl text-sm font-bold ml-5 text-white text-center justify-center">Price: {flight.price} €</p>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}