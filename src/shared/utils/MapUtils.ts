import React from 'react';

declare let google: any;

/**
 * @param recordingList
 * Returns the most southwest and northeast points from a list of recordings
 * The minimum and maximum latitude are -85.05112878º and 85.05112878º
 * The minimum and maximum longitude are -180º and 180º
 */
export const getRecordingsLatLngBounds = recordingList => {
  let mostSouth = 85.05112878;
  let mostNorth = -85.05112878;
  let mostWest = 180;
  let mostEast = -180;

  recordingList.forEach(r => {
    if (r.geolocation) {
      if (r.geolocation.latitude > mostNorth) {
        mostNorth = r.geolocation.latitude;
      }
      if (r.geolocation.latitude > mostSouth) {
        mostSouth = r.geolocation.latitude;
      }
      if (r.geolocation.longitude > mostEast) {
        mostEast = r.geolocation.longitude;
      }
      if (r.geolocation.longitude < mostWest) {
        mostWest = r.geolocation.longitude;
      }
    }
  });

  const southWest = {
    lat: mostSouth,
    lng: mostWest
  }
  const northEast = {
    lat: mostNorth,
    lng: mostEast
  }
  return {
    southwest: southWest,
    northeast: northEast
  };
}

export default undefined;