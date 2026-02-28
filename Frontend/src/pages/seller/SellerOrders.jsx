import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Seller orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders(); // refresh after update
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  if (loading) return <Message>Loading orders...</Message>;

  return (
    <PageWrapper>
      <Container>
        <Heading>SELLER ORDERS</Heading>

        {orders.length === 0 ? (
          <Message>No orders found</Message>
        ) : (
          <OrdersList>
            {orders.map((order) => (
              <OrderCard key={order._id}>
                <OrderTop>
                  <OrderId>
                    ORDER ID: {order._id.slice(-6).toUpperCase()}
                  </OrderId>

                  <Status className={order.status}>
                    {order.status}
                  </Status>
                </OrderTop>

                <ProductsGrid>
                  {order.products.map((item) => (
                    <ProductRow key={item._id}>
                      <ProductImage
                        src={`http://localhost:5000${item.product.image}`}
                        alt={item.product.name}
                      />

                      <ProductInfo>
                        <ProductName>{item.product.name}</ProductName>
                        <Meta>
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                        </Meta>
                        <Price>₹{item.price}</Price>
                      </ProductInfo>
                    </ProductRow>
                  ))}
                </ProductsGrid>

                <BottomRow>
                  <Total>Total: ₹{order.totalAmount}</Total>

                  <Select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="shipped">Shipped</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                </BottomRow>
              </OrderCard>
            ))}
          </OrdersList>
        )}
      </Container>
    </PageWrapper>
  );
};

export default SellerOrders;

const PageWrapper = styled.div`
  background: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Message = styled.h3`
  text-align: center;
  margin-top: 80px;
  color: #666;
  font-weight: 400;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 16px;
`;

const OrderTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const OrderId = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const Status = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  &.pending { color: orange; }
  &.approved { color: green; }
  &.rejected { color: red; }
  &.shipped { color: #007bff; }
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductRow = styled.div`
  display: flex;
  gap: 12px;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

const ProductImage = styled.img`
  width: 70px;
  height: 90px;
  object-fit: cover;
  border: 1px solid #eee;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: 13px;
  font-weight: 500;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #777;
`;

const Price = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const BottomRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border: 1px solid #ddd;
  font-size: 12px;
  cursor: pointer;
`;
