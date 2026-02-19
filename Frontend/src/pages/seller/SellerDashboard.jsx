import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBoxOpen, FaClipboardList, FaUser } from "react-icons/fa";
import styled from "styled-components";

const SellerDashboard = () => {
    const navigate = useNavigate();
    // Profile data
    const [user, setUser] = useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);
    // Dummy stats (later from API)
    const [stats, setStats] = useState({
        totalProducts: 12,
        totalOrders: 34,
        totalRevenue: 45200,
        pendingOrders: 5,
    });

    // Dummy recent orders
    const [orders, setOrders] = useState([
        {
            id: "ORD001",
            customer: "Rahul",
            amount: 1200,
            status: "Pending",
        },
        {
            id: "ORD002",
            customer: "Priya",
            amount: 850,
            status: "Delivered",
        },
        {
            id: "ORD003",
            customer: "Shubham",
            amount: 2400,
            status: "Shipped",
        },
        {
            id: "ORD003",
            customer: "Shivam",
            amount: 420,
            status: "Delivered",
        },

    ]);

    return (
        <Wrapper>
            <Header>
                <Title>Seller Dashboard</Title>
                <Subtitle>Welcome back <b>{user.name}</b></Subtitle>
            </Header>
            <StatsGrid>
                <StatCard>
                    <StatNumber>{stats.totalProducts}</StatNumber>
                    <StatLabel>Total Products</StatLabel>
                </StatCard>

                <StatCard>
                    <StatNumber>{stats.totalOrders}</StatNumber>
                    <StatLabel>Total Orders</StatLabel>
                </StatCard>

                <StatCard>
                    <StatNumber>₹{stats.totalRevenue}</StatNumber>
                    <StatLabel>Total Revenue</StatLabel>
                </StatCard>

                <StatCard>
                    <StatNumber>{stats.pendingOrders}</StatNumber>
                    <StatLabel>Pending Orders</StatLabel>
                </StatCard>
            </StatsGrid>

            <Section>
                <SectionTitle>Quick Actions</SectionTitle>
                <ActionsGrid>
                    <ActionButton onClick={() => navigate("/seller/addproducts")}>
                        <IconWrapper>
                            <FaPlus />
                        </IconWrapper>
                        Add Product
                    </ActionButton>

                    <ActionButton onClick={() => navigate("/seller/products")}>
                        <IconWrapper>
                            <FaBoxOpen />
                        </IconWrapper>
                        View Products
                    </ActionButton>

                    <ActionButton onClick={() => navigate("/seller/orders")}>
                        <IconWrapper>
                            <FaClipboardList />
                        </IconWrapper>
                        View Orders
                    </ActionButton>

                    <ActionButton onClick={() => navigate("/seller/profile")}>
                        <IconWrapper>
                            <FaUser />
                        </IconWrapper>
                        Profile
                    </ActionButton>
                </ActionsGrid>
            </Section>

            <Section>
                <SectionTitle>Recent Orders</SectionTitle>
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>₹{order.amount}</td>
                                    <Status $status={order.status}>{order.status}</Status>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </Section>
        </Wrapper>
    );
};

export default SellerDashboard;

const Wrapper = styled.div`
  padding: 30px;
  background: #f5f6fa;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111;
`;

const Subtitle = styled.p`
  color: #666;
  margin-top: 5px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 35px;
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatNumber = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #111;
`;

const StatLabel = styled.p`
  color: #666;
  margin-top: 6px;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  font-size: 20px;
  color: #111;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
`;

const ActionButton = styled.button`
  padding: 14px;
  border: none;
  background: #111;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.25s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 14px;
    text-align: left;
  }

  thead {
    background: #111;
    color: white;
  }

  tbody tr {
    border-bottom: 1px solid #eee;
  }
`;

const Status = styled.td`
  font-weight: 600;
  color: ${(props) =>
        props.$status === "Delivered"
            ? "green"
            : props.$status === "Pending"
                ? "orange"
                : "#111"};
`;
