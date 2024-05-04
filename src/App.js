import React, { useState } from 'react';

const ChargingStation = () => {
  const [chargingStationMaxCapacity, setChargingStationMaxCapacity] = useState(0);
  const [numberOfChargers, setNumberOfChargers] = useState(0);
  const [numberOfCars, setNumberOfCars] = useState(0);
  const [currentKilowatt, setCurrentKilowatt] = useState(0);
  const [chargingPoints, setChargingPoints] = useState([]);

  const calculateCharging = () => {
    let currentKilowatt = 0;
    let chargingPointsData = [];

    if (numberOfCars === 1) {
      currentKilowatt = chargingStationMaxCapacity;
      chargingPointsData = [chargingStationMaxCapacity, ...Array(numberOfChargers - 1).fill(0)];
    } else {
      const usedChargers = Math.min(numberOfCars, numberOfChargers);
      const capacityPerCharger = chargingStationMaxCapacity / usedChargers;
      currentKilowatt = capacityPerCharger * usedChargers;

      chargingPointsData = Array(numberOfChargers).fill(0);
      for (let i = 0; i < usedChargers; i++) {
        chargingPointsData[i] = capacityPerCharger;
      }
    }

    setCurrentKilowatt(currentKilowatt);
    setChargingPoints(chargingPointsData);
  };

  return (
    <div>
      <h2>Charging Station</h2>
      <div>
        <label>
          Charging Station Max Capacity (kW):
          <input
            type="number"
            value={chargingStationMaxCapacity}
            onChange={(e) => setChargingStationMaxCapacity(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Chargers:
          <input
            type="number"
            value={numberOfChargers}
            onChange={(e) => setNumberOfChargers(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Number of Cars:
          <input
            type="number"
            value={numberOfCars}
            onChange={(e) => setNumberOfCars(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button onClick={calculateCharging}>Calculate</button>
      <div>
        <h3>Current Kilowatt: {currentKilowatt}</h3>
        <h3>Charging Points:</h3>
        <ul>
          {chargingPoints.map((point, index) => (
            <li key={index}>Charger {index + 1}: {point} kW</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChargingStation;
