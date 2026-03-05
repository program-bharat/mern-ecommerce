import styled from "styled-components";
import { useEffect } from "react";
import AOS from "aos";

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 450,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    return (
        <Wrapper>
            <Card data-aos="zoom-in">
                <Title data-aos="zoom-out">About Us</Title>

                <Text data-aos="zoom-in" data-aos-delay="100">
                    Welcome to Stylix. We are committed to delivering high-quality
                    fashion products with a seamless shopping experience for both
                    buyers and sellers.
                </Text>

                <Text data-aos="zoom-in" data-aos-delay="200">
                    Our platform empowers sellers to grow their business while helping
                    customers discover the latest trends at the best prices.
                </Text>

                <Text data-aos="zoom-in" data-aos-delay="300">
                    Thank you for being part of our journey.
                </Text>
            </Card>
        </Wrapper>
    );
};

export default AboutUs;

const Wrapper = styled.div`
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  padding: 40px 20px;
`;

const Card = styled.div`
  max-width: 600px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 14px;
`;