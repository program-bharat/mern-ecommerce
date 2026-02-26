import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const BuyerEditProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // 🔥 Fetch profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setFormData({
                    name: res.data.name || "",
                    phone: res.data.phone || "",
                    password: "",
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    // handle change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 🔥 update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                "http://localhost:5000/api/auth/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsError(false);
            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <Wrapper>
            <Card>
                <Title>Edit Profile</Title>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Phone</Label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep same"
                        />
                    </FormGroup>

                    <Button type="submit">Update Profile</Button>
                </Form>

                {message && (
                    <Message error={isError}>{message}</Message>
                )}
            </Card>
        </Wrapper>
    );
};

export default BuyerEditProfile;

const Wrapper = styled.div`
  min-height: 90vh;
  background: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 400px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 2px rgba(17,17,17,0.1);
  }
`;

const Button = styled.button`
  padding: 12px;
  margin-top: 10px;
  background: #111;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  margin-top: 14px;
  text-align: center;
  color: ${(p) => (p.error ? "red" : "green")};
`;