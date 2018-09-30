import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button';

const RightArrow = (props) => {
  return (
  	<div className="right-arrow" >
  	<Button variant="fab" aria-label="Add" onClick={props.goToNextSlide}>
        <SvgIcon >
      <path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" />
      </SvgIcon>
      </Button>
    
      
    
    </div>
  );
}

export default RightArrow;