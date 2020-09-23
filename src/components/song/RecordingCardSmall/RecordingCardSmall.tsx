import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import getArtistsString from '../../../shared/utils/StringUtils';
import './RecordingCardSmall.css'
import RecordImage from '../../../shared/assets/image/record_400.png'
import {Source, SourceIconSize} from '../../../shared/constants/constants';
import SourceButtonSmall from '../../../shared/lib/Button/SourceButtonSmall/SourceButtonSmall';

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

  return (
    <Card style={{maxWidth: '10rem', height: '100%'}} className='recording-card-small'>
      <div className='recording-card-small-container'>
        {recording.spotify?.api?.album?.images[0].url ?
          <img className='recording-card-small-image' alt='Album Cover' src={recording.spotify?.api?.album?.images[0].url}/>
          :
          <img className='recording-card-small-image' alt='Album Cover' src={RecordImage}/>
        }
        <div className='recording-card-small-content'>
          <div className='recording-card-small-track text-truncate'>
            {recording.acrCloud?.track?.name}
          </div>
          <div className='recording-card-small-artists text-truncate'>
            {getArtistsString(recording.acrCloud?.artists)}
          </div>
        </div>
      </div>
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
    </Card>
  )
};

RecordingCardSmall.propTypes = {
  recording: PropTypes.object.isRequired
};

export default RecordingCardSmall;
