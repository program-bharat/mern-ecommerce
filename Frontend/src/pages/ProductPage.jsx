import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { addToCart } from "../utils/cart";

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );
            setProduct(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Function to check if product needs size selection
    const needsSize = () => {
        if (!product) return false;
        const sizeCategories = [
            "shirt", "t-shirt", "tshirt", "top",
            "pant", "jean", "trouser", "bottom", "cargos", "cargo",
            "shoe", "footwear", "sneaker", "boot",
            "jacket", "hoodie", "sweater", "short",
            "skirt", "dress", "suit", "blazer"
        ];

        const productCategory = product.category?.toLowerCase() || "";
        return sizeCategories.some(cat => productCategory.includes(cat));
    };

    const handleAddToCart = () => {
        if (needsSize() && !selectedSize) {
            alert("Please select a size");
            return;
        }
        addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize || null,
            quantity: quantity
        });
        alert("Added to cart successfully!");
    };

    // Handle buy now
    const handleBuyNow = () => {
        if (needsSize() && !selectedSize) {
            alert("Please select a size");
            return;
        }
        // add to cart first
        addToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize || null,
            quantity: quantity
        });
        navigate("/cart");
    };
    const mockSizes = needsSize() ?
        (product?.category?.toLowerCase().includes("shoe") ?
            ["6", "7", "8", "9", "10", "11"] :
            ["XS", "S", "M", "L", "XL", "XXL"]
        ) : [];

    if (!product) return <Loading>Loading...</Loading>;

    return (
        <PageContainer>
            <MainContent>
                <ImageWrapper>
                    <ProductImage
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                    />
                </ImageWrapper>
                <DetailsWrapper>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>₹{product.price}</ProductPrice>

                    <DescriptionSection>
                        <DescriptionTitle>DESCRIPTION</DescriptionTitle>
                        <DescriptionText>
                            {product.description || "No description available for this product."}
                        </DescriptionText>
                    </DescriptionSection>

                    {/* Size Only shows for clothes/shoes */}
                    {needsSize() && (
                        <Section>
                            <SectionTitle>SIZE</SectionTitle>
                            <SizeGrid>
                                {mockSizes.map((size) => (
                                    <SizeButton
                                        key={size}
                                        className={selectedSize === size ? "active" : ""}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </SizeButton>
                                ))}
                            </SizeGrid>
                        </Section>
                    )}

                    {/* Quantity selector */}
                    <Section>
                        <SectionTitle>QUANTITY</SectionTitle>
                        <QuantitySelector>
                            <QuantityButton
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </QuantityButton>
                            <QuantityValue>{quantity}</QuantityValue>
                            <QuantityButton
                                onClick={() => setQuantity(prev => prev + 1)}
                                disabled={quantity >= 10}
                            >
                                +
                            </QuantityButton>
                        </QuantitySelector>
                    </Section>

                    {/* Action Button */}
                    <ButtonGroup>
                        <AddToCartBtn onClick={handleAddToCart}>
                            ADD TO CART
                        </AddToCartBtn>
                        <BuyNowBtn onClick={handleBuyNow}>
                            BUY NOW
                        </BuyNowBtn>
                    </ButtonGroup>
                </DetailsWrapper>
            </MainContent>
        </PageContainer>
    );
};

export default ProductPage;

const PageContainer = styled.div`
    background: #ffffff;
    min-height: 100vh;
    padding: 30px 40px;
`;

const MainContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    max-width: 1300px;
    margin: 0 auto;
`;

// Loading state
const Loading = styled.h2`
    text-align: center;
    margin-top: 100px;
    font-size: 24px;
    color: #666;
    font-weight: 400;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-height: 90vh;
`;

const ProductImage = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
    max-height: 85vh;
    object-fit: contain;
`;


const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px 0;
`;

const ProductName = styled.h1`
    font-size: 28px;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.3px;
`;

const ProductPrice = styled.div`
    font-size: 32px;
    font-weight: 500;
    color: #2a2a2a;
    margin: 0 0 8px 0;
`;

const DescriptionSection = styled.div`
    margin: 8px 0 16px 0;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
`;

const DescriptionTitle = styled.h4`
    font-size: 13px;
    font-weight: 600;
    color: #666;
    margin-bottom: 12px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
`;

const DescriptionText = styled.p`
    font-size: 15px;
    color: #4a4a4a;
    line-height: 1.7;
    margin: 0;
    font-weight: 400;
`;

const Section = styled.div`
    margin: 4px 0;
`;

const SectionTitle = styled.h4`
    font-size: 13px;
    font-weight: 600;
    color: #666;
    margin-bottom: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
`;

const SizeGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const SizeButton = styled.button`
    min-width: 52px;
    padding: 10px 0;
    background: white;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f8f8f8;
        border-color: #999;
    }
    
    &.active {
        background: #1a1a1a;
        color: white;
        border-color: #1a1a1a;
    }
`;

const QuantitySelector = styled.div`
    display: inline-flex;
    align-items: center;
    border: 1px solid #e0e0e0;
`;

const QuantityButton = styled.button`
    width: 44px;
    height: 44px;
    background: white;
    border: none;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.4 : 1};
    
    &:hover:not(:disabled) {
        background: #f8f8f8;
    }
`;

const QuantityValue = styled.span`
    width: 58px;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    color: #1a1a1a;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin: 24px 0 10px 0;
`;

const AddToCartBtn = styled.button`
    flex: 1;
    padding: 16px 20px;
    background: white;
    border: 1.5px solid #1a1a1a;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    
    &:hover {
        background: #f8f8f8;
    }
`;

const BuyNowBtn = styled.button`
    flex: 1;
    padding: 16px 20px;
    background: #1a1a1a;
    color: white;
    border: 1.5px solid #1a1a1a;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;
    
    &:hover {
        background: #333;
    }
`;