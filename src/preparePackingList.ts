import clothesByWeather from './clothesByWeather';

import { Weather } from './types';

const DAYS_IN_WEEK = 7; // could decide to go with 5

export default function preparePackingList(
  trip: Weather[],
): Record<string, number> {
  const packingList: Record<string, number> = {};

  /*
    clothingTypesForTrip is used to total up how many days of each packing rule
    are in the trip.

    For example, { LightShirt: {D: 4, W: 4, T: 1, days: 9} } wiil mean that
    - 9 total days with a LightShirt packing rule
    - 4 of those days the rule is pack 1 / Day
    - 4 of those days the rule is pack 1 / Week
    - 1 of those days the rule is pack 1 / Trip
  */
  const clothingTypesForTrip = Object.keys(
    clothesByWeather['Below Freezing']['Dry'],
  ).reduce((types, type) => {
    types[type] = { D: 0, W: 0, T: 0, days: 0 };
    return types;
  }, {});
  // console.log('clothingTypesForTrip', clothingTypesForTrip);

  /*
    daysByWeather aggregates all the weather days during the trip
    eg: { 'Cold': {'Dry': 3, 'Light rain': 4, 'Heavy rain': 7} }
  */
  const daysByWeather = trip.reduce((days, day) => {
    const { temperature, precipitation } = day;
    days[temperature] = days[temperature] || {};
    if (days[temperature][precipitation]) {
      days[temperature][precipitation] += 1;
    } else {
      days[temperature][precipitation] = 1;
    }
    return days;
  }, {});
  // console.log('daysByWeather', daysByWeather);

  /*
    populate clothingTypesForTrip based on daysByWeather
  */
  Object.keys(daysByWeather).forEach((temp) => {
    Object.keys(daysByWeather[temp]).forEach((rain) => {
      const days = daysByWeather[temp][rain];
      const clothingRulesForWeather = clothesByWeather[temp][rain];
      Object.keys(clothingRulesForWeather).forEach((clothingType) => {
        const rule = clothingRulesForWeather[clothingType];
        if (rule) {
          clothingTypesForTrip[clothingType].days += days;
          if (rule === 'D') {
            clothingTypesForTrip[clothingType].D += days;
          } else if (rule === 'W') {
            clothingTypesForTrip[clothingType].W += days;
          } else if (rule === 'T') {
            clothingTypesForTrip[clothingType].T += days;
          }
        }
      });
    });
  });
  // console.log('clothingTypesForTrip', clothingTypesForTrip);

  /*
    assemble the packing list
  */
  Object.keys(clothingTypesForTrip).forEach((clothingType) => {
    let numToPack = 0;
    const { days, D, T, W } = clothingTypesForTrip[clothingType];

    if (days !== 0) {
      // pack one for each day marked as '1 / Day'
      numToPack += D;

      // pack one for every 7 days marked as '1 / Week'
      numToPack += Math.ceil(W / DAYS_IN_WEEK);

      // pack one if any days are '1 / Trip' and none are packed yet
      if (numToPack === 0 && T > 0) {
        numToPack += 1;
      }

      packingList[clothingType] = numToPack;
    }
  });
  // console.log('packingList', packingList);

  return packingList;
}
