import { PlaneCard } from '../../model/card.model';
import axios from 'axios';
import { decodeToken, JwtPayload } from '../../utils/jwt.utils';
import { useEffect, useState } from 'react';
import { userInfo } from '../../model/UserInfo';

interface FlightCardProps {
    flight: PlaneCard;
}


const FlightCard = ({ flight }:FlightCardProps):JSX.Element => {
    const [jwtUserData, setJwtUserData] = useState<JwtPayload | null>(null)
    const [userData, setUserData] = useState<userInfo | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token){
            setJwtUserData(decodeToken(token))
        }
    }, [])

    useEffect(() => {
        if (jwtUserData?.userId) {
            axios.get(`http://${import.meta.env.VITE_SERVER}/api/user/find/${jwtUserData?.userId}`)
            .then(response => {
                console.log('Response', response)
                setUserData(response.data)
            }).catch(error => {
                console.error('Error', error)
            })
        }
    })

    const handleBookClick = () => {
        const now = new Date();
        const reqBody = {
            flight: flight,
            user: userData,
            ReservationDate: now,
            seat: "A43", //to define
            status: "Schedulled", // what is it
            payment: true,
            price: flight.price
        }
        axios.post(`http://${import.meta.env.VITE_SERVER}/api/reservation/creatReservation`)
            .then(response => {
                console.log("response", response)
            }).catch(error => {
                console.error("Error", error)
            })
    }

    return (
        <>
            <div className="card w-full flex items-center">
                <div className="card-body hover:bg-fourth bg-third sm:w-3/5 w-full rounded-xl border-r-4 border-t-4 border-l-2 border-b-2">
                    <h2 className="card-title text-3xl text-fifth font-bold">{flight.segmentAirlineName}</h2>
                    <div className='grid grid-cols-3 grid-rows-2 '>
                        <div className='row-span-2 col-span-1'>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.departureTime.getHours()} : { (flight.departureTime.getMinutes() < 10 ? '0' : '') + flight.departureTime.getMinutes() }</p>
                            <p className="sm:text-2xl text-sm text-black font-bold">{flight.startingAirport}</p>
                        </div>
                        <div className='row-span-2 col-span-1'>
                            <p className="sm:text-2xl text-lg text-black font-bold">{flight.arrivalTime.getHours()} : {(flight.arrivalTime.getMinutes() < 10 ? '0' : '') + flight.arrivalTime.getMinutes() }</p>
                            <p className="sm:text-2xl text-lg text-black font-bold">{flight.destinationAirport}</p>
                        </div>
                        <div className='justify-center items-center flex row-span-1 col-span-1'>
                            <button className="btn btn-square align-middle bg-white text-first  flex flex-1 w-full max-w-48">Book</button>
                        </div>
                        <div className='col-span1 row-span-1 flex justify-center items-center'>
                            <p className="text-2xl font-bold ml-5 text-white text-center justify-center">Price: {flight.price} €</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlightCard;
