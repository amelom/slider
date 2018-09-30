import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button';


const LeftArrow = (props) => {
  return (
    <div  className="left-arrow">
  	<Button variant="fab" aria-label="Add" onClick={props.goToPrevSlide}>
        <SvgIcon >
      <path d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z" />
      </SvgIcon>
      </Button>
    
      
    
    </div>
  );
}

export default LeftArrow;