import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toggleWishlist, isInWishlist } from "../utils/wishlist";

const categories = ["all", "jackets", "trousers", "shirts", "jeans", "polos", "cargos", "overshirts", "shoes", "sunglasses", "bags"];

const ShowAllProducts = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("all");
    const [products, setProducts] = useState([]);
    const [, rerender] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const filtered = active === "all"
        ? products
        : products.filter(p => p.category?.toLowerCase() === active);

    const handleWishlist = (e, id) => {
        e.stopPropagation();
        toggleWishlist(id);
        rerender(n => n + 1);
    };
    return (
        <Wrapper>
            <Heading>NEW & POPULAR</Heading>
            <ButtonRow>
                {categories.map(cat => (
                    <FilterButton
                        key={cat}
                        $active={active === cat}
                        onClick={() => setActive(cat)}
                    >
                        {cat}
                    </FilterButton>
                ))}
            </ButtonRow>

            <Grid>
                {filtered.map(product => (
                    <Card key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                        <WishlistBtn
                            className={isInWishlist(product._id) ? "active" : ""}
                            onClick={e => handleWishlist(e, product._id)}
                        >
                            <FaHeart />
                        </WishlistBtn>
                        <ImageContainer>
                            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                        </ImageContainer>
                        <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>₹{product.price}</ProductPrice>
                        </ProductInfo>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default ShowAllProducts;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 60px 60px;
    background: #fff;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const Heading = styled.h2`
    text-align: center;
    margin: 0 0 20px;
    letter-spacing: 1px;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-bottom: 40px;
`;

const FilterButton = styled.button`
    padding: 7px 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    border: 1.5px solid #000;
    border-radius: 0;
    outline: none;
    transition: background 0.13s, color 0.13s;
    background: ${({ $active }) => ($active ? "#000" : "#fff")};
    color: ${({ $active }) => ($active ? "#fff" : "#000")};
    &:hover { background: ${({ $active }) => ($active ? "#000" : "#f0f0f0")}; }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    width: 100%;
    @media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 900px)  { grid-template-columns: repeat(3, 1fr); }
    @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
`;

const Card = styled.div`
    background: #fff;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
`;

const ImageContainer = styled.div`
    position: relative;
    padding-top: 125%;
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }
    ${Card}:hover img { transform: scale(1.04); }
`;

const ProductInfo = styled.div`padding: 10px;`;

const ProductName = styled.h4`
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
    font-size: 13px;
    font-weight: 600;
    color: #000;
    margin: 0;
`;

const WishlistBtn = styled.div`
    position: absolute;
    top: 10px;
    
    right: 10px;
    width: 34px;
    height: 34px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    svg { font-size: 14px; color: #999; transition: transform 0.15s; }
    &.active svg { color: red; }
    &:hover svg { transform: scale(1.1); }
`;