import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const items = getCart();
        setCartItems(items);
    };

    const removeItem = (index) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        setCartItems(updated);

        const key = localStorage.getItem("user")
            ? `cart_${JSON.parse(localStorage.getItem("user")).id}`
            : "cart_guest";

        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = (index, amount) => {
        const updated = [...cartItems];
        updated[index].quantity += amount;

        if (updated[index].quantity <= 0) {
            updated.splice(index, 1);
        }

        setCartItems(updated);

        const key = localStorage.getItem("user")
            ? `cart_${JSON.parse(localStorage.getItem("user")).id}`
            : "cart_guest";

        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first");
                navigate("/login");
                return;
            }
            // sending items to backend
            await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: item.size,
                    })),
                }),
            });

            // cart clear
            const user = JSON.parse(localStorage.getItem("user"));
            const key = user ? `cart_${user.id}` : "cart_guest";
            localStorage.removeItem(key);
            window.dispatchEvent(new Event("cartUpdated"));
            alert("Order placed successfully!");
            navigate("/orders");

        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <Title>MY CART</Title>
                    <ItemCount>{cartItems.length} items</ItemCount>
                </Header>

                {cartItems.length === 0 ? (
                    <EmptyState>
                        <BagIcon>
                            <FaShoppingBag />
                        </BagIcon>
                        <EmptyText>Your cart is empty</EmptyText>
                        <ShopButton onClick={() => navigate("/")}>
                            CONTINUE SHOPPING
                        </ShopButton>
                    </EmptyState>
                ) : (
                    <>
                        <ProductGrid>
                            {cartItems.map((item, index) => (
                                <Card key={index}>
                                    <ImageContainer
                                        onClick={() =>
                                            navigate(`/product/${item.productId}`)
                                        }
                                    >
                                        <Image
                                            src={`http://localhost:5000${item.image}`}
                                            alt={item.name}
                                        />
                                    </ImageContainer>

                                    <ProductInfo>
                                        <ProductName>{item.name}</ProductName>

                                        {item.size && (
                                            <SizeText>
                                                Size: {item.size}
                                            </SizeText>
                                        )}

                                        <Price>₹{item.price}</Price>

                                        <QuantityRow>
                                            <QtyBtn
                                                onClick={() =>
                                                    updateQuantity(index, -1)
                                                }
                                            >
                                                -
                                            </QtyBtn>
                                            <QtyValue>
                                                {item.quantity}
                                            </QtyValue>
                                            <QtyBtn
                                                onClick={() =>
                                                    updateQuantity(index, 1)
                                                }
                                            >
                                                +
                                            </QtyBtn>
                                        </QuantityRow>

                                        <RemoveBtn
                                            onClick={() => removeItem(index)}
                                        >
                                            <FaTrash /> REMOVE
                                        </RemoveBtn>
                                    </ProductInfo>
                                </Card>
                            ))}
                        </ProductGrid>

                        <SummaryBox>
                            <TotalText>
                                TOTAL: ₹{totalAmount}
                            </TotalText>
                            <CheckoutBtn onClick={handleCheckout}>
                                PROCEED TO CHECKOUT
                            </CheckoutBtn>
                        </SummaryBox>
                    </>
                )}
            </Container>
        </PageWrapper>
    );
};

export default Cart;

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
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
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
`;

const BagIcon = styled.div`
    font-size: 32px;
    margin-bottom: 16px;
    color: #999;
`;

const EmptyText = styled.h3`
    font-size: 18px;
    color: #666;
`;

const ShopButton = styled.button`
    margin-top: 20px;
    padding: 12px 24px;
    background: #000;
    color: white;
    border: none;
    cursor: pointer;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
`;

const Card = styled.div`
    background: white;
    border: 1px solid #e0e0e0;
    width: 260px;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 320px; 
    overflow: hidden;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProductInfo = styled.div`
    padding: 12px;
`;

const ProductName = styled.h4`
    font-size: 13px;
    margin-bottom: 6px;
`;

const SizeText = styled.p`
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
`;

const Price = styled.p`
    font-weight: 600;
    margin-bottom: 10px;
`;

const QuantityRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

const QtyBtn = styled.button`
    width: 28px;
    height: 28px;
    border: 1px solid #e0e0e0;
    background: white;
    cursor: pointer;
`;

const QtyValue = styled.span`
    font-size: 14px;
`;

const RemoveBtn = styled.button`
    width: 100%;
    padding: 8px;
    border: 1px solid #e0e0e0;
    background: white;
    font-size: 12px;
    cursor: pointer;
`;

const SummaryBox = styled.div`
    margin-top: 30px;
    background: white;
    padding: 20px;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TotalText = styled.h3`
    font-size: 18px;
`;

const CheckoutBtn = styled.button`
    padding: 12px 24px;
    background: #000;
    color: white;
    border: none;
    cursor: pointer;
`;