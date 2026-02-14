import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.email || !formData.password) {
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

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            )
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setIsError(false);
            setMessage(res.data.message);
            setTimeout(() => {
                navigate("/");
            }, 1000);

            setFormData({
                email: "",
                password: "",
            });
        } catch (error) {
            setIsError(true)
            setMessage(error.response?.data?.message || "Login Failed");
        }
    }
    return (
        <>
            <Wrapper>
                <FormCard>
                    <Title>Login</Title>

                    <Form onSubmit={handleSubmit}>
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

                        <Button type="submit">Login</Button>
                    </Form>

                    {message && <Message error={isError}>{message}</Message>}

                    <LoginText>
                        Don't have an account?{" "}
                        <StyledLink to="/register">Register</StyledLink>
                    </LoginText>
                </FormCard>
            </Wrapper>
        </>
    )
}

export default Login

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