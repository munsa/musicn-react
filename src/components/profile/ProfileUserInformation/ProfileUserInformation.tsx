import React from 'react';
import {Image} from 'react-bootstrap';
import './ProfileUserInformation.css';

const ProfileUserInformation = ({profile: {user}}) => {
  return user && (
    <div className='user-info-container'>
      <Image
        fluid
        src={user.avatar}
        alt='User Avatar'
        className='rounded-circle shadow'
        width='100'
        height='100'
      />
      <div className='user-name'>
        {user.username}
      </div>
      { /* isLoggedUser ? 'LOGGED USER' : '' */}
    </div>
  )
};

ProfileUserInformation.propTypes = {};


export default ProfileUserInformation;
