import React from 'react';
import { PlaneCard } from '../../model/card.model'; // Import the plane card model


interface FlightCardProps {
    flight: PlaneCard; // Define the flight prop with the PlaneCardModel type
}



// Generate an example PlaneCard
const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
    return (
        <>
         <div className="card  w-full flex items-center">
            <div className="card-body bg-fourth w-3/5 rounded-xl border-r-4 border-t-4">
                <h2 className="card-title text-3xl  text-white font-bold">{flight.airline}</h2>
                <div className='flex flex-row justify-between'>
                    <div>
                        <p className="text-lg text-black">{flight.departureDate.toLocaleString()}</p>
                        <p className="text-lg text-black">{flight.departure}</p>
                    </div>
                    <div>
                        <p className="text-lg text-black">{flight.arrivalDate.toLocaleString()}</p>
                        <p className="text-lg text-black">{flight.arrival}</p>
                    </div>
                </div>
                <p className=" text-black text-3xl font-bol">From {flight.departure} to {flight.arrival}</p>
                <p className="text-lg text-fourth">Price: {flight.price} €</p>
            </div>
         </div>

        </>
    );
};

export default FlightCard;