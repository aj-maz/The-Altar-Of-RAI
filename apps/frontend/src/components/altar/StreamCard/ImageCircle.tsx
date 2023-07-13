import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Circle = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Holder = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
`

const rotateText = keyframes`   
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

const Text = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${rotateText} 8s linear infinite;
  color: black;
`

const Character = styled.span`
  position: absolute;
  left: 50%;
  transform-origin: 50% 137.5px;
`

const rotateOne = keyframes`   
       0% {
      transform: rotate(240deg);
    }
    25% {
      transform: rotate(360deg);
    }
    50% {
      transform: rotate(240deg);
    }
    75% {
      transform: rotate(120deg);
    }
    100% {
      transform: rotate(240deg);
    }
`

const ImageOne = styled.img`
  width: 200px;
  height: 200px;
  transform-origin: 50% 110%;
  animation: ${rotateOne} 4s ease-in-out infinite;
  position: absolute;
  top: 25px;
  left: 25px;
`

const rotateTwo = keyframes`   
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(120deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-120deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const ImageTwo = styled.img`
  width: 200px;
  height: 200px;
  transform-origin: 50% 110%;
  animation: ${rotateTwo} 4s ease-in-out infinite;
  position: absolute;
  top: 25px;
  left: 25px;
`

const rotateThree = keyframes`   
  0% {
    transform: rotate(120deg);
  }
  25% {
    transform: rotate(240deg);
  }
  50% {
    transform: rotate(120deg);
  }
  75% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(120deg);
  }
`

const ImageThree = styled.img`
  width: 200px;
  height: 200px;
  transform-origin: 50% 110%;
  animation: ${rotateThree} 4s ease-in-out infinite;
  position: absolute;
  top: 25px;
  left: 25px;
`

//
const ImageCircle = () => {
  const text = 'SACRIFICE $KITE FOR THE SAKE OF $FLX'

  return (
    <Container>
      <Circle>
        <Holder>
          <ImageOne src="/assets/Image1.svg" />
          <ImageTwo src="/assets/Image2.svg" />
          <ImageThree src="/assets/Image3.svg" />
        </Holder>
        <Text>
          <p>
            {text.split('').map((char, i) => (
              <Character key={i} style={{ transform: `rotate(${i * 9.6}deg)` }}>
                {char}
              </Character>
            ))}
          </p>
        </Text>
      </Circle>
    </Container>
  )
}

export default ImageCircle
