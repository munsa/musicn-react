import React from 'react';
import PropTypes from 'prop-types';

const SongTable = ({songs}) => {
  return (
    <div>
      <table className="table table-dark">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Artist</th>
          <th scope="col">Track</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
        {songs.map((s, i) => (
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{s.artists}</td>
            <td>{s.track}</td>
            <td>{(new Date(s.date)).toLocaleString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
};

SongTable.propTypes = {
  songs: PropTypes.array
};

export default SongTable;
