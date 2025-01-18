import { useState } from 'react';

import WeatherSelect from './WeatherSelect';
import { Weather } from './types';
import './App.css';
import preparePackingList from './preparePackingList';
import clothesByWeather from './clothesByWeather';

function App() {
  const [trip, setTrip] = useState<Weather[]>([]);
  const [packingList, setPackingList] = useState<Record<string, number>>({});

  return (
    <>
      <div>Trip Planner</div>
      <br />
      <div>
        {trip.map((day, index) => (
          <div key={day.temperature + day.precipitation + index}>
            Day {index + 1}: {day.temperature} / {day.precipitation}
          </div>
        ))}
      </div>
      <br />
      <WeatherSelect
        clothesByWeather={clothesByWeather}
        onSubmit={({ temperature, precipitation }) => {
          setTrip(trip.concat([{ temperature, precipitation }]));
        }}
      />
      <br />
      <div>
        <button onClick={() => setPackingList(preparePackingList(trip))}>
          Prepare Packing List
        </button>
      </div>
      <div>
        {Object.keys(packingList).length > 0 ? 'Packing List' : ''}
        {Object.keys(packingList).map((key) => (
          <div key={key}>
            {key}: {packingList[key]}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
