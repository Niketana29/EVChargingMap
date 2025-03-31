require("dotenv").config();
const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load Charging Stations from Excel
const loadChargingStations = () => {
    try {
        const filePath = path.join(__dirname, "verified_ev_stations_v2.xlsx");
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Convert lat & lng to float for Google Maps
        return data.map(station => ({
            name: station.Name,
            latitude: parseFloat(station.Latitude),
            longitude: parseFloat(station.Longitude),
            chargingType: station["Charging Type"] || "Unknown",
        }));
    } catch (error) {
        console.error("Error reading Excel file:", error);
        return [];
    }
};

// API Endpoint for Charging Stations
app.get("/api/charging-stations", (req, res) => {
    const stations = loadChargingStations();
    res.json(stations);
});

// Root Route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
