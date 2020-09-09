import React from 'react';

export const getArtistsString = (artists) => {
  let result = '';
  if(artists) {
    result = artists.map(a => {
      return a['name']
    }).join(', ')
  }
  return result;
}

export default getArtistsString;
