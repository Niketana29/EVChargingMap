require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");
const app = express();

const xlsx = require('xlsx');

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Load EV stations from Excel
app.get("/stations", async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile("verified_ev_stations_v2.xlsx");
        const worksheet = workbook.worksheets[0];

        let stations = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber !== 1) {
                stations.push({
                    name: row.getCell(1).value,
                    latitude: row.getCell(2).value,
                    longitude: row.getCell(3).value,
                    chargingType: row.getCell(4).value,
                });
            }
        });

        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: "Error reading file" });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
