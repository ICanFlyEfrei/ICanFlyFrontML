import React from 'react';
import { PlaneCardUpdate } from '../../model/cardUpdate.model';
const { useState } = React;
import { FlightCardUpdate } from './FlightCardUpdate';
import { FlightCardPreUpdate } from './FlightCardPreUpdate';

interface FlightCardPreUpdateProps {
    flight: PlaneCardUpdate;
}


export const CardUpdate = ({ flight }: FlightCardPreUpdateProps): JSX.Element => {

    const [editing, setEditing] = useState<boolean>(false);

    return (
        <div className='w-full'>
            {editing ? <FlightCardUpdate flight={flight} editFunc={setEditing} /> : <FlightCardPreUpdate flight={flight} editFunc={setEditing} />}
        </div>
    );
}
