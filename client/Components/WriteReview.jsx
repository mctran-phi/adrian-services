import React from 'react';


import styled from 'styled-components'



const ReviewText = styled.div`
position: relative;
font-family: 'Roboto', sans-serif;
font-size: 25px;
font-weight 500;

`


const Container = styled.div`

left: -25rem;
top: 68rem;
border-bottom: 2px solid #e7e7e7;
width: 20rem;

`



const TextStyle = styled.div`
font-family: 'Roboto', sans-serif;
font-size: 15px;
font-weight 300;

`


const ButtonAmazon = styled.button`
width: 100%;

`


function WriteReview () {

 return (

    <div>
      <Container>
     <ReviewText>Review this product.</ReviewText>
     <ButtonAmazon> Write a customer review</ButtonAmazon>
      <TextStyle>Share your thoughts with other customers</TextStyle>
      </Container>

    </div>
 )


}



export default WriteReview;




