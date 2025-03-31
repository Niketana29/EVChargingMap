import React, { useEffect, useState } from "react";
import axios from "axios";

const EVChargingMap = () => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const loadStations = async () => {
          const data = await fetchChargingStations();
          setStations(data);
        };
        loadStations();
      }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/stations")
            .then(response => setStations(response.data))
            .catch(error => console.error("Error fetching stations", error));
    }, []);

    return (
        <div>
          <h2>EV Charging Stations</h2>
          <ul>
            {stations.map((station, index) => (
              <li key={index}>{station.name} - {station.location}</li>
            ))}
          </ul>
        </div>
      );
}

export default EVChargingMap;
