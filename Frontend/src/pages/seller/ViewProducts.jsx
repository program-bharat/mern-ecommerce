import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(data);
      } catch (error) {
        console.error("Fetch products error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };
  if (loading) return <Message>Loading products...</Message>;
  if (!products.length) return <Message>No products added yet.</Message>;

  return (
    <Wrapper>
      <HeaderRow>
        <Title>Your Products</Title>
        <Count>{products.length} items</Count>
      </HeaderRow>

      <Grid>
        {products.map((product) => (
          <Card key={product._id}>
            <ImageWrapper>
              <Image src={`http://localhost:5000${product.image}`} alt={product.name} />
              <StockBadge $inStock={product.stock > 0}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </StockBadge>
            </ImageWrapper>

            <CardBody>
              <Name title={product.name}>{product.name}</Name>

              <PriceRow>
                <Price>₹{product.price}</Price>
                <StockText>{product.stock} left</StockText>
              </PriceRow>

              <Actions>
                <EditBtn>
                  <FaEdit />
                  Edit
                </EditBtn>

                <DeleteBtn onClick={() => handleDelete(product._id)}>
                  <FaTrash />
                </DeleteBtn>
              </Actions>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ViewProducts;

const Message = styled.h2`
  text-align: center;
  margin-top: 80px;
`;

const Wrapper = styled.div`
  padding: 32px;
  background: #f6f7fb;
  min-height: 100vh;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

const Count = styled.span`
  background: #111;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.25s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 190px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StockBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${(p) => (p.$inStock ? "#2e7d32" : "#c62828")};
  color: white;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111;
`;

const StockText = styled.span`
  font-size: 13px;
  color: #666;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditBtn = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background: #111;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;

  &:hover {
    background: #333;
  }
`;

const DeleteBtn = styled.button`
  width: 42px;
  border: none;
  background: #e53935;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c62828;
  }
`;
