import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCard.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import {Source} from '../../../shared/constants/constants';
import SourceButtonS from '../../../shared/lib/Button/SourceButtonS/SourceButtonS';

const RecordingCard = ({recording}) => {
    const openSourceTrackURL = (source: string, trackId: string) => {
      let url: string;
      if (source === Source.SPOTIFY) {
        url = 'https://open.spotify.com/track/' + trackId;
      } else if (source === Source.DEEZER) {
        url = 'https://www.deezer.com/track/' + trackId;
      }
      let win = window.open(url, '_blank');
      win.focus();
    }

    const getCoverImage = () => {
      let result = RecordImage;
      const images = recording.spotify?.api?.album?.images;
      if (images && images.length > 1) {
        result = images[1].url;
      } else if (images && images.length === 1) {
        result = images[0].url;
      }

      return result;
    }

    return (
      <Card className='recording-card'>
        <div className="image-flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img className='flip-card-image' alt='Album Cover' src={getCoverImage()}/>
            </div>
            <div className="flip-card-back d-flex flex-column justify-content-around">

              {recording.spotify?.track?.id != null &&
              <div className='mr-4'>
                <SourceButtonS source={Source.SPOTIFY}
                               onClickCallback={() => openSourceTrackURL(Source.SPOTIFY, recording.spotify.track.id)}/>
              </div>
              }
              {recording.deezer?.track?.id != null &&
              <div className='mr-3'>
                <SourceButtonS source={Source.DEEZER}
                               onClickCallback={() => openSourceTrackURL(Source.DEEZER, recording.deezer.track.id)}/>
              </div>
              }
              {recording.spotify?.track?.id == null && recording.deezer?.track?.id == null &&
              <div>
                No sources for this song
              </div>
              }
            </div>
          </div>
        </div>

        <div className='mt-1'>
          <div className='recording-map-window-track text-truncate'>
            {recording.acrCloud?.track?.name}
          </div>
          <div className='recording-map-window-artists text-truncate'>
            {getArtistsString(recording.acrCloud?.artists)}
          </div>
        </div>

      </Card>
    )
  }
;

RecordingCard.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCard;
