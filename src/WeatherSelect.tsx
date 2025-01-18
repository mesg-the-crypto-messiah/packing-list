import { useState } from 'react';

import { ClothesByWeather, Weather } from './types';

export type TempSelectProps = {
  clothesByWeather: ClothesByWeather;
  onSubmit: (weather: Weather) => void;
};

export default function TempSelect({
  clothesByWeather,
  onSubmit,
}: TempSelectProps) {
  const temperatures = Object.keys(clothesByWeather);

  const [temperature, setTemperature] = useState(temperatures[0]);
  const [precipitation, setPrecipitation] = useState(
    Object.keys(clothesByWeather[temperature])[0],
  );

  return (
    <div>
      <div>
        <label>
          Feels Like:
          <select
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          >
            {temperatures.map((temp) => (
              <option key={temp} value={temp}>
                {temp}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Rain Level:
          <select
            value={precipitation}
            onChange={(e) => setPrecipitation(e.target.value)}
          >
            {Object.keys(clothesByWeather[temperature]).map((rain) => (
              <option key={rain} value={rain}>
                {rain}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button onClick={() => onSubmit({ temperature, precipitation })}>
          Add
        </button>
      </div>
    </div>
  );
}
