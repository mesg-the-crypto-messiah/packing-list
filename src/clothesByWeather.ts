import weatherwear from './assets/weatherwear.json';
import { ClothesByWeather } from './types';

const clothesByWeather: ClothesByWeather = weatherwear.reduce((temps, temp) => {
  const { Temperature, Precipitation, ...clothes } = temp;
  temps[Temperature] = temps[Temperature] || {};
  temps[Temperature][Precipitation] = { ...clothes };
  return temps;
}, {});

export default clothesByWeather;
