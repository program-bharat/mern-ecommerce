import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const AddProduct = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            // later connect to backend
            console.log("Product Data:", form);
            alert("Product added successfully ✅");
            navigate("/seller/products");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Card>
                <Title>Add New Product</Title>

                <Form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        placeholder="Product Name"
                        onChange={handleChange}
                        required
                    />

                    <TextArea
                        name="description"
                        placeholder="Product Description"
                        onChange={handleChange}
                        required
                    />

                    <Row>
                        <Input
                            name="price"
                            type="number"
                            placeholder="Price"
                            onChange={handleChange}
                            required
                        />

                        <Input
                            name="stock"
                            type="number"
                            placeholder="Stock Quantity"
                            onChange={handleChange}
                            required
                        />
                    </Row>

                    <Input
                        name="category"
                        placeholder="Category"
                        onChange={handleChange}
                        required
                    />

                    {/* Image Upload */}
                    <UploadBox>
                        <label htmlFor="image">
                            <FaUpload /> Upload Product Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            hidden
                        />
                    </UploadBox>

                    {preview && <Preview src={preview} alt="preview" />}

                    <Button disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </Button>
                </Form>
            </Card>
        </Wrapper>
    );
};

export default AddProduct;

const Wrapper = styled.div`
  padding: 40px;
  background: #f5f6fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-height: 100px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;

  & > * {
    flex: 1;
  }
`;

const UploadBox = styled.div`
  padding: 14px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;

  label {
    cursor: pointer;
    font-weight: 500;
  }
`;

const Preview = styled.img`
  width: 120px;
  border-radius: 10px;
  margin: 10px auto;
`;

const Button = styled.button`
  padding: 14px;
  border: none;
  background: #111;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #333;
  }
`;
