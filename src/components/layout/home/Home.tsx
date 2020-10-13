import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import RecordingMap from '../../map/RecordingMap';
import {getAllRecordingGeolocations, getTop10FromGenre} from '../../../actions/recording'
import PropTypes from 'prop-types';
import './Home.css';
import Header from './header/Header';
import MusicCarousel from '../../profile/MusicCarousel/MusicCarousel';

const Home = ({allRecordings, trending, getTop10FromGenre, getAllRecordingGeolocations, currentPosition}) => {
  useEffect(() => {
    if (allRecordings.length === 0) {
      getAllRecordingGeolocations();
    }
    if(!trending) {
      getTop10FromGenre('Hip Hop', 'hipHop');
      getTop10FromGenre('Indie Rock', 'indieRock');
      getTop10FromGenre('Electro', 'electronic');
      getTop10FromGenre('Alternative', 'alternative');
    }
  }, []);

  return (
    <div>
      <Header/>
      <div className='home-body'>
        <div className='container-md'>
          <div className='home-recording-map mt-5'>
            <div className='map-border'>
              <RecordingMap recordingList={allRecordings} center={currentPosition ? currentPosition : undefined}
                            zoom={currentPosition ? 20 : undefined}/>
            </div>
          </div>
          <div className='mt-5'>
            <h5>
              Top 10 Alternative
            </h5>
            {trending && trending.alternative &&
            <MusicCarousel recordings={trending.alternative}/>
            }
          </div>
          <div className='mt-5'>
            <h5>
              Top 10 Hip Hop
            </h5>
            {trending && trending.hipHop &&
            <MusicCarousel recordings={trending.hipHop}/>
            }
          </div>
          <div className='mt-5'>
            <h5>
              Top 10 Indie Rock
            </h5>
            {trending && trending.indieRock &&
            <MusicCarousel recordings={trending.indieRock}/>
            }
          </div>
          <div className='mt-5'>
            <h5>
              Top 10 Electronic
            </h5>
            {trending && trending.electronic &&
            <MusicCarousel recordings={trending.electronic}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allRecordings: state.recording.all,
  currentPosition: state.geolocation.currentPosition,
  trending: state.recording.trending
});

Home.propTypes = {
  getAllRecordingGeolocations: PropTypes.func.isRequired,
  allRecordings: PropTypes.array.isRequired,
  trending: PropTypes.object
};

export default connect(mapStateToProps, {getAllRecordingGeolocations, getTop10FromGenre})(Home);
