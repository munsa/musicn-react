import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecordingMapWindow.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import {Source} from '../../../shared/constants/constants';
import getArtistsString from '../../../shared/utils/StringUtils';
import {Image} from 'react-bootstrap';
import SourceButtonS from '../../../shared/lib/Button/SourceButtonS/SourceButtonS';

const RecordingCardSmall = ({recording}) => {
  const history = useHistory();
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

  const openUserProfile = () => {
    history.push('/profile/' + recording.user.username);
  }

  return (
    <div className='recording-map-window-container'>

      <div className='window-user-information d-flex pointer'
           onClick={() => openUserProfile()}>
        <Image
          fluid
          src={recording.user.avatar}
          alt='User Avatar'
          className='window-user-information-avatar rounded-circle mr-1'
          width='20'
          height='20'
        />
        {recording.user.username}
      </div>

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
};

RecordingCardSmall.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCardSmall;
