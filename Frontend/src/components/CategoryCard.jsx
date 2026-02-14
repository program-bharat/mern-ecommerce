import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const CategoryCard = ({ image, title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/category/${title.toLowerCase()}`);
  }
  return (
    <>
      <CategoryCards onClick={handleClick}>
        <Image src={image} alt={title} />
        <Overlay>
          <Title>{title}</Title>
        </Overlay>
      </CategoryCards>
    </>
  )
}

export default CategoryCard;

const CategoryCards = styled.div`
  position: relative;
  width: 215px;
  height: 280px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${CategoryCards}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
`;

const Title = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
`;