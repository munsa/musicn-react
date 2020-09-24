import React from 'react';
import PropTypes from 'prop-types';
import './RecordingMapWindow.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import {Source} from '../../../shared/constants/constants';
import SourceButtonSmall from '../../../shared/lib/Button/SourceButtonSmall/SourceButtonSmall';
import SourceButton from '../../../shared/lib/Button/SourceButton/SourceButton';
import getArtistsString from '../../../shared/utils/StringUtils';

const RecordingCardSmall = ({recording}) => {
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
    if (recording.spotify?.api?.album?.images[0].url) {
      return recording.spotify?.api?.album?.images[0].url
    } else {
      return RecordImage;
    }
  }

  return (
    <div className='recording-map-window-container'>
      <div className="image-flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img className='flip-card-image' alt='Album Cover' src={getCoverImage()}/>
          </div>
          <div className="flip-card-back d-flex flex-column justify-content-around">

            {recording.spotify?.track?.id != null &&
            <div>
              <SourceButton source={Source.SPOTIFY}
                                 onClickCallback={() => openSourceTrackURL(Source.SPOTIFY, recording.spotify.track.id)}/>
            </div>
            }
            {recording.deezer?.track?.id != null &&
            <div>
              <SourceButton source={Source.DEEZER}
                                 onClickCallback={() => openSourceTrackURL(Source.DEEZER, recording.deezer.track.id)}/>
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
    </div>
  )
}
/*
  <div className='recording-card-small'>
    <div className='recording-card-small-container'>

      <div className='recording-card-small-buttons mx-auto mx-2'>
        <div className='d-flex flex-wrap justify-content-center'>
          {recording.spotify?.track?.id != null &&
          <div className='p-2'>
            <SourceButtonSmall source={Source.SPOTIFY}
                               iconSize={SourceIconSize.SMALL}
                               onClickCallback={() => openSourceTrackURL(Source.SPOTIFY, recording.spotify.track.id)}/>
          </div>
          }
          {recording.deezer?.track?.id != null &&
          <div className='p-2'>
            <SourceButtonSmall source={Source.DEEZER}
                               iconSize={SourceIconSize.SMALL}
                               onClickCallback={() => openSourceTrackURL(Source.DEEZER, recording.deezer.track.id)}/>
          </div>
          }
        </div>
      </div>
      <div className='recording-card-small-content'>
        <div className='recording-card-small-track text-truncate'>
          {recording.acrCloud?.track?.name}
        </div>
        <div className='recording-card-small-artists text-truncate'>
          {getArtistsString(recording.acrCloud?.artists)}
        </div>
      </div>
    </div>

  </div>
)
*/

RecordingCardSmall.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCardSmall;
