import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const CategoryPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedFit, setSelectedFit] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:5000/api/products/category/${category}`
            );
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sizes = ["28", "30", "32", "34", "36", "38"];
    const fits = ["SLIM", "REGULAR", "RELAXED", "BAGGY", "STRAIGHT"];
    const priceRanges = [
        { label: "Under ₹1000", value: "under1000" },
        { label: "₹1000 – ₹3000", value: "1000-3000" },
        { label: "Above ₹3000", value: "above3000" }
    ];
    // Config for dynamic filter
    const categoryFilters = {
        jackets: { showSize: true, showFit: true, showPrice: true },
        trousers: { showSize: true, showFit: true, showPrice: true },
        shirts: { showSize: true, showFit: true, showPrice: true },
        jeans: { showSize: true, showFit: true, showPrice: true },
        polos: { showSize: true, showFit: true, showPrice: true },
        cargos: { showSize: true, showFit: true, showPrice: true },
        overshirts: { showSize: true, showFit: true, showPrice: true },
        shoes: { showSize: true, showFit: false, showPrice: true },
        sunglasses: { showSize: false, showFit: false, showPrice: true },
        bags: { showSize: false, showFit: false, showPrice: true }
    };
    const currentFilters = categoryFilters[category?.toLowerCase()] || {};

    if (loading) return <Message>Loading products...</Message>;

    return (
        <PageWrapper>
            <Container>
                <Sidebar>
                    <FilterHeading>FILTERS</FilterHeading>
                    {/* SIZE FILTER */}
                    {currentFilters.showSize && (
                        <FilterBlock>
                            <FilterTitle>SIZE</FilterTitle>
                            <SizeGrid>
                                {sizes.map((size) => (
                                    <SizeButton
                                        key={size}
                                        className={selectedSize === size ? "active" : ""}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </SizeButton>
                                ))}
                            </SizeGrid>
                        </FilterBlock>
                    )}

                    {/* FIT FILTER */}
                    {currentFilters.showFit && (
                        <FilterBlock>
                            <FilterTitle>FIT</FilterTitle>
                            <FitGrid>
                                {fits.map((fit) => (
                                    <FitButton
                                        key={fit}
                                        className={selectedFit === fit ? "active" : ""}
                                        onClick={() => setSelectedFit(fit)}
                                    >
                                        {fit}
                                    </FitButton>
                                ))}
                            </FitGrid>
                        </FilterBlock>
                    )}

                    {/* PRICE FILTER */}
                    {currentFilters.showPrice && (
                        <FilterBlock>
                            <FilterTitle>PRICE</FilterTitle>
                            {priceRanges.map((price) => (
                                <FilterOption key={price.value}>
                                    <input
                                        type="radio"
                                        name="price"
                                        value={price.value}
                                        checked={selectedPrice === price.value}
                                        onChange={(e) => setSelectedPrice(e.target.value)}
                                    />
                                    {price.label}
                                </FilterOption>
                            ))}
                        </FilterBlock>
                    )}

                    {/* FILTER ACTIONS */}
                    <BtnRow>
                        <ClearBtn onClick={() => {
                            setSelectedSize("");
                            setSelectedFit("");
                            setSelectedPrice("");
                        }}>
                            CLEAR
                        </ClearBtn>
                        <ApplyBtn>
                            APPLY ({products.length})
                        </ApplyBtn>
                    </BtnRow>
                </Sidebar>
                {/* Product Grid */}
                <ProductSection>
                    <ProductGrid>
                        {products.map((product) => (
                            <Card
                                key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <ImageContainer>
                                    <Image
                                        src={`http://localhost:5000${product.image}`}
                                        alt={product.name}
                                    />
                                </ImageContainer>
                                <ProductInfo>
                                    <ProductName>{product.name}</ProductName>
                                    <ProductPrice>
                                        ₹{product.price}
                                        {product.originalPrice && (
                                            <OriginalPrice>₹{product.originalPrice}</OriginalPrice>
                                        )}
                                    </ProductPrice>
                                </ProductInfo>
                            </Card>
                        ))}
                    </ProductGrid>
                </ProductSection>
            </Container>
        </PageWrapper>
    );
};

export default CategoryPage;

const PageWrapper = styled.div`
    background: #f5f5f5;
    min-height: 100vh;
    padding: 0 20px;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0;
`;

const Message = styled.h2`
    text-align: center;
    margin-top: 80px;
    font-size: 24px;
    color: #666;
`;

// Sidebar Styles
const Sidebar = styled.div`
    background: white;
    padding: 16px;
    height: fit-content;
    position: sticky;
    top: 20px;
    border: 1px solid #e0e0e0;
`;

const FilterHeading = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e0e0e0;
`;

const FilterBlock = styled.div`
    margin-bottom: 24px;
`;

const FilterTitle = styled.h4`
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
`;

// Size Filter
const SizeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`;

const SizeButton = styled.button`
    padding: 8px;
    background: white;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background: #f5f5f5;
    }
    
    &.active {
        background: #000;
        color: white;
        border-color: #000;
    }
`;

// Fit Filter
const FitGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const FitButton = styled.button`
    padding: 6px 12px;
    background: white;
    border: 1px solid #e0e0e0;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background: #f5f5f5;
    }
    
    &.active {
        background: #000;
        color: white;
        border-color: #000;
    }
`;

// Price Filter
const FilterOption = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 12px;
    cursor: pointer;

    input[type="radio"] {
        width: 14px;
        height: 14px;
        cursor: pointer;
        accent-color: #000;
    }
`;

// Filter Actions
const BtnRow = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 16px;
`;

const ClearBtn = styled.button`
    flex: 1;
    padding: 10px;
    background: white;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background: #f5f5f5;
    }
`;

const ApplyBtn = styled.button`
    flex: 1;
    padding: 10px;
    background: #000;
    color: white;
    border: 1px solid #000;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        background: #333;
    }
`;

// Product Section Styles
const ProductSection = styled.div`
    width: 100%;
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
    padding: 10px;
`;

const ProductName = styled.h4`
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
    font-size: 13px;
    font-weight: 600;
    color: #000;
`;

const OriginalPrice = styled.span`
    font-size: 11px;
    font-weight: 400;
    color: #999;
    text-decoration: line-through;
    margin-left: 6px;
`;