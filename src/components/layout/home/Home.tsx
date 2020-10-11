import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordingGeolocations} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';
import MusicCarousel from '../../profile/MusicCarousel/MusicCarousel';
import api from '../../../shared/utils/api';
import Loader from '../../../shared/lib/Loaders/Loader/Loader';
import Spinner from '../../../shared/lib/Loaders/Spinner/Spinner';

const Home = ({allRecordings, getAllRecordingGeolocations, currentPosition}) => {
  const [trendingTunesList, setTrendingTunesList] = useState([]);
  const [trendingTunesLoader, setTrendingTunesLoader] = useState(0);
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordingGeolocations();
      getTop10FromGenre('Hip Hop');
      getTop10FromGenre('Indie Rock');
      getTop10FromGenre('Electro');
      getTop10FromGenre('Alternative');
    }
  }, []);

  const getTop10FromGenre = async (genre) => {
    setTrendingTunesLoader(trendingTunesLoader + 1);
    const res = await api.get(`/recording/genre/${genre}?limit=10`);
    setTrendingTunesLoader(trendingTunesLoader - 1);

    console.log(res.data);
    const trendingTunes = {
      genreName: genre,
      top10: res.data
    }
    trendingTunesList.push(trendingTunes);
  }

  return (
    <div>
      <Header/>
      <div className='home-body'>
        <div className='container-md'>
          { trendingTunesList && trendingTunesList.map((t, j) => (
            <div key={j} className='mt-5'>
              <h5>
                Top 10 {t.genreName}
              </h5>
              <MusicCarousel recordings={t.top10}/>
            </div>
          ))}
          { trendingTunesLoader > 0 &&
            <Spinner/>
          }
          <div className='home-recording-map mt-5'>
            <div className='map-border'>
              <RecordingMap recordingList={allRecordings} center={currentPosition ? currentPosition : undefined}
                            zoom={currentPosition ? 16 : undefined}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allRecordings: state.recording.all,
  currentPosition: state.geolocation.currentPosition
});

Home.propTypes = {
  getAllRecordingGeolocations: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {getAllRecordingGeolocations})(Home);
