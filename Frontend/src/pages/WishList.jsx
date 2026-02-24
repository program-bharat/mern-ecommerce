import { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "../utils/wishlist";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const WishList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlistProducts();
    }, []);

    // Get wishlist ids → fetch products from backend
    const fetchWishlistProducts = async () => {
        try {
            const ids = getWishlist();

            if (ids.length === 0) {
                setProducts([]);
                return;
            }

            // fetch all products by ids
            const res = await axios.get(
                `http://localhost:5000/api/products/wishlist?ids=${ids.join(",")}`
            );
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // remove from wishlist
    const removeFromWishlist = (id) => {
        toggleWishlist(id);
        setProducts(prev => prev.filter(p => p._id !== id));
    };

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <Title>MY WISHLIST</Title>
                    <ItemCount>{products.length} items</ItemCount>
                </Header>

                {products.length === 0 ? (
                    <EmptyState>
                        <HeartIcon>
                            <FaHeart />
                        </HeartIcon>
                        <EmptyText>Your wishlist is empty</EmptyText>
                        <ShopButton onClick={() => navigate("/")}>
                            CONTINUE SHOPPING
                        </ShopButton>
                    </EmptyState>
                ) : (
                    <ProductGrid>
                        {products.map(product => (
                            <Card key={product._id}>
                                <WishlistBtn
                                    className="active"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromWishlist(product._id);
                                    }}
                                >
                                    <FaHeart />
                                </WishlistBtn>

                                <ImageContainer
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <Image
                                        src={`http://localhost:5000${product.image}`}
                                        alt={product.name}
                                    />
                                </ImageContainer>

                                <ProductInfo>
                                    <ProductName>{product.name}</ProductName>
                                    <PriceSection>
                                        <ProductPrice>₹{product.price}</ProductPrice>
                                        {product.originalPrice && (
                                            <OriginalPrice>₹{product.originalPrice}</OriginalPrice>
                                        )}
                                    </PriceSection>

                                    <RemoveBtn
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromWishlist(product._id);
                                        }}
                                    >
                                        <FaTrash /> REMOVE
                                    </RemoveBtn>
                                </ProductInfo>
                            </Card>
                        ))}
                    </ProductGrid>
                )}
            </Container>
        </PageWrapper>
    );
};

export default WishList;

const PageWrapper = styled.div`
    background: #f5f5f5;
    min-height: 100vh;
    padding: 0 20px;
`;

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 0 4px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #000;
    margin: 0;
`;

const ItemCount = styled.span`
    font-size: 14px;
    color: #666;
    background: white;
    padding: 6px 12px;
    border: 1px solid #e0e0e0;
`;

const EmptyState = styled.div`
    padding: 60px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const HeartIcon = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid #e0e0e0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        font-size: 32px;
        color: #999;
    }
`;

const EmptyText = styled.h3`
    font-size: 18px;
    font-weight: 400;
    color: #666;
    margin: 0;
`;

const ShopButton = styled.button`
    padding: 12px 24px;
    background: #000;
    color: white;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background: #333;
    }
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    
    @media (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;

const Card = styled.div`
    background: white;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    
    &:hover {
        border-color: #000;
    }
`;

const WishlistBtn = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    height: 34px;
    width: 34px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    svg {
        font-size: 14px;
        color: red;
    }

    &:hover svg {
        transform: scale(1.1);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    padding-top: 125%;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProductInfo = styled.div`
    padding: 12px;
`;

const ProductName = styled.h4`
    font-size: 13px;
    font-weight: 400;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PriceSection = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
`;

const ProductPrice = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #000;
`;

const OriginalPrice = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #999;
    text-decoration: line-through;
`;

const RemoveBtn = styled.button`
    width: 100%;
    padding: 8px;
    background: white;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    
    &:hover {
        background: #f5f5f5;
        border-color: #000;
        color: #000;
    }
    
    svg {
        font-size: 11px;
    }
`;