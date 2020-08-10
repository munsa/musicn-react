import React from 'react';

export const getArtistsString = (artists) => {
  return artists.map(a => {
    return a['name']
  }).join(', ')
}

export default getArtistsString;
