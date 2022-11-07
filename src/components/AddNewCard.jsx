import React from 'react'
import styled from 'styled-components'

const AddNewCard = ({src,title}) => {
  return (
    <Container>
        <Image src = {src} />
        <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.div`
    background:#fff;
    margin:1rem;
    width: 29rem;
    height: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    border-radius:0.8rem;
    cursor: pointer;
`;

const Image = styled.img`


`;


const Title = styled.h2``;

export default AddNewCard;