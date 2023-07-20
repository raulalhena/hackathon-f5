import React from 'react'
import { useEffect, useState } from 'react'

function Prueba() {

    const [data, setData] = useState('No messages');
    
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:4000/favorites/categories?category=Legumbres&userId=1');
       console.log(eventSource);
        eventSource.onmessage = ({ data }) => {
            setData(data);
            return () => {
                eventSource.close();
            };
        }
    }, []);

    return (
        <div>{data}</div>
    )
}

export default Prueba