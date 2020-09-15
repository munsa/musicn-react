import React from 'react';
import './LoadMoreButton.css';
import {Button} from 'react-bootstrap';

const LoadMoreButton = ({onClickCallback}) => {

  return (
    <div className='load-more-button-container'>
      <Button className='load-more-button' onClick={() => onClickCallback()}>
        Load more
      </Button>
    </div>
  );

};

export default LoadMoreButton;