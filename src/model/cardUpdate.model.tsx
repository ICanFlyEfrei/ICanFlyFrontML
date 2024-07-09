export interface PlaneCardUpdate {
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
}