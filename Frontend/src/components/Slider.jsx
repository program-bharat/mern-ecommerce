import { useState, useEffect } from "react"
import styled from "styled-components"

const Slider = ({ images }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <SliderWrapper>
                <SlideImage src={images[index]} alt="Slides" />
                <DotsContainer>
                    {images.map((_, i) => (
                        <Dot
                            key={i}
                            $active={i === index}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </DotsContainer>
            </SliderWrapper>
        </>
    )
}

export default Slider

const SliderWrapper = styled.div`
  width: 100%;
  height: 91vh;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
        props.active ? "white" : "rgba(255,255,255,0.5)"};
  cursor: pointer;
  transition: 0.5s;
`;
