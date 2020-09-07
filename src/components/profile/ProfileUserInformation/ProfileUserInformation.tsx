import React from 'react';
import {Image} from 'react-bootstrap';
import './ProfileUserInformation.css';

const ProfileUserInformation = ({profile: {user}, isLoggedUser}) => {
  return user && (
    <div className='user-info-container'>
      <Image
        fluid
        src={user.avatar}
        alt='User Avatar'
        className='rounded-circle user-avatar'
        width='150'
        height='150'
      />
      <div className='user-name'>
        {user.username}
      </div>
      { isLoggedUser ? 'LOGGED USER' : ''}
    </div>
  )
};

ProfileUserInformation.propTypes = {};


export default ProfileUserInformation;
