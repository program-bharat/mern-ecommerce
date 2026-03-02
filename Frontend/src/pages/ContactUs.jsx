import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AOS from "aos";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [responseMsg, setResponseMsg] = useState("");
    const [isError, setIsError] = useState(false);

    // AOS init
    useEffect(() => {
        AOS.init({
            duration: 450,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setIsError(true);
            setResponseMsg("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/contact",
                formData
            );

            setIsError(false);
            setResponseMsg(res.data.message);

            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (err) {
            setIsError(true);
            setResponseMsg(err.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (responseMsg) {
            const timer = setTimeout(() => {
                setResponseMsg("");
                setIsError(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [responseMsg]);

    return (
        <Wrapper>
            <FormCard data-aos="zoom-in-down">
                <Title >Contact Us</Title>

                <Form onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup  >
                        <Label>Message</Label>
                        <TextArea
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <Button type="submit">Send Message</Button>
                </Form>
                {responseMsg && (
                    <Message error={isError}>{responseMsg}</Message>
                )}
            </FormCard>
        </Wrapper>
    );
};

export default ContactUs;

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

  &:focus {
    outline: none;
    border-color: #111;
    box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  resize: none;

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
  transition: all 0.25s ease;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "green")};
`;