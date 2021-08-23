import React from 'react';
import styled from 'styled-components';
import ps1 from '../../public/ps1.jpg';
import ps2 from '../../public/ps2.jpg';
import ps3 from '../../public/ps3.jpg';
import ps4 from '../../public/ps4.jpg';

const ImageFormat = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 60rem;
`;

const Images = () => {
  return (
    <ImageFormat>
      <img src={ps1}></img>
      <img src={ps2}></img>
      <img src={ps3}></img>
      <img src={ps4}></img>
    </ImageFormat>
  );
};

export default Images;