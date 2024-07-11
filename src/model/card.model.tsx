export interface PlaneCard {
    flightNumber: string,
    departureTime: Date,
    arrivalTime: Date,
    startingAirport: string,
    destinationAirport: string,
    segmentAirlineName: string
    segmentEquipmentDescription: string,
    numberOfSeats: number,
    status: string
    price : number;

    // id:number;
    // airline: string;
    // departureDate: Date;
    // arrivalDate: Date;
    // departure: string;
    // arrival: string;
    // destination: string;
    //price : number;

}