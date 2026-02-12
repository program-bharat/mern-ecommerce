import styled from "styled-components";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, } from "react-icons/fa";
const Footer = () => {
    return (
        <>
            <FooterWrapper>
                <TopSection>
                    <BrandSection>
                        <Logo>BHaRaT</Logo>
                        <Description>Elevate your everyday style with premium quality fashion.
                            Designed for comfort. Built for confidence.</Description>
                        <SocialIcons>
                            <Icon><FaInstagram /></Icon>
                            <Icon><FaFacebookF /></Icon>
                            <Icon><FaTwitter /></Icon>
                            <Icon><FaYoutube /></Icon>
                        </SocialIcons>
                    </BrandSection>
                    <LinkSection>
                        <Column>
                            <Heading>SHOP</Heading>
                            <LinkItem>Shop All</LinkItem>
                            <LinkItem>Best Sellers</LinkItem>
                            <LinkItem>New Arrivals</LinkItem>
                            <LinkItem>Jackets</LinkItem>
                            <LinkItem>Shirts</LinkItem>
                            <LinkItem>Jeans</LinkItem>
                        </Column>
                        <Column>
                            <Heading>CUSTOMER CARE</Heading>
                            <LinkItem>Contact Us</LinkItem>
                            <LinkItem>FAQs</LinkItem>
                            <LinkItem>Shipping Policy</LinkItem>
                            <LinkItem>Returns & Refunds</LinkItem>
                            <LinkItem>Track Order</LinkItem>
                        </Column>
                        <Column>
                            <Heading>COMPANY</Heading>
                            <LinkItem>About Us</LinkItem>
                            <LinkItem>Careers</LinkItem>
                            <LinkItem>Privacy Policy</LinkItem>
                            <LinkItem>Terms & Conditions</LinkItem>
                        </Column>
                    </LinkSection>
                </TopSection>
                <BottomSection>
                    © {new Date().getFullYear()} BHaRaT. All Rights Reserved.
                </BottomSection>
            </FooterWrapper >
        </>
    )
}

export default Footer;

const FooterWrapper = styled.footer`
    background: #111;
    color: #fff;
    padding: 60px 80px 20px;
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
`;
const BrandSection = styled.div`
    flex: 1;
    min-width: 250px;

`;
const Logo = styled.h2`
    font-size: 28px;
    letter-spacing: 4px;
    margin-bottom: 20px;
`;
const Description = styled.div`
    font-size: 14px;
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 20px;

`;
const SocialIcons = styled.div`
    display: flex;
    gap: 15px;
`;
const Icon = styled.div`
    background: #222;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #444;
    }
`;


const LinkSection = styled.div`
    flex: 2;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 40px;
`;
const Column = styled.div`
    min-width: 160px;
`;

const Heading = styled.h4`
    font-size: 14px;
    margin-bottom: 15px;
    letter-spacing: 1px;
`;
const LinkItem = styled.p`
    font-size: 13px;
    color: #bbb;
    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
    color: white;
    }
`;

const BottomSection = styled.div`
    border-top: 1px solid #222;
    margin-top: 40px;
    padding-top: 20px;
    text-align: center;
    font-size: 12px;
    color: #aaa;
`;