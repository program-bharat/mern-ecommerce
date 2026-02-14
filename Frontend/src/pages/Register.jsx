import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setIsError(true);
            setMessage("All fields are required");
            return;
        }
        // Email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setIsError(true);
            setMessage("Please enter a valid email address");
            return;
        }
        if (formData.password.length < 6) {
            setIsError(true);
            setMessage("Password must be at least 6 characters");
            return;
        }
        // API Call
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            setIsError(false);
            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || "Error occurred");
        }
    };
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setIsError(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [message]);
    return (
        <>
            <Wrapper>
                <FormCard>
                    <Title>Register</Title>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Register As</Label>

                            <RadioGroup>
                                <RadioLabel>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        checked={formData.role === "buyer"}
                                        onChange={handleChange}
                                    />
                                    Buyer
                                </RadioLabel>

                                <RadioLabel>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="seller"
                                        checked={formData.role === "seller"}
                                        onChange={handleChange}
                                    />
                                    Seller
                                </RadioLabel>
                            </RadioGroup>
                        </FormGroup>

                        <Button type="submit">Register</Button>
                    </Form>
                    {message && <Message error={isError}>{message}</Message>}
                    <LoginText>
                        Already have an account?{" "}
                        <StyledLink to="/login">Login</StyledLink>
                    </LoginText>
                </FormCard>
            </Wrapper>
        </>
    )
}

export default Register

const Wrapper = styled.div`
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
`;

const FormCard = styled.div`
  width: 350px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  transition: letter-spacing 0.3s ease;
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
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;


const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #111;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Message = styled.p`
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    color: ${(props) => (props.error ? "red" : "green")};
    transition: opacity 0.3s ease;
`;

const LoginText = styled.p`
    margin-top: 14px;
    text-align: center;
    font-size: 14px;
    color: #555;
`;

const StyledLink = styled(Link)`
    color: #111;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.25s ease;
    &:hover {
      color: #333;
      text-decoration: underline;
    }
`;
