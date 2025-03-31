import React, { useEffect, useState } from "react";
import axios from "axios";

function EVChargingMap() {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/stations")
            .then(response => setStations(response.data))
            .catch(error => console.error("Error fetching stations", error));
    }, []);

    return (
        <div>
            <h1>EV Charging Stations</h1>
            <ul>
                {stations.map((station, index) => (
                    <li key={index}>{station.name} ({station.latitude}, {station.longitude})</li>
                ))}
            </ul>
        </div>
    );
}

export default EVChargingMap;
