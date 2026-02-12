import styled from "styled-components";
import CategoryCard from "./CategoryCard";

const categories = [
    { title: "JACKETS", image: "/Category/Jacket.webp" },
    { title: "TROUSERS", image: "/Category/Trousers.webp" },
    { title: "SHIRTS", image: "/Category/Shirt.webp" },
    { title: "JEANS", image: "/Category/Jeans.webp" },
    { title: "POLOS", image: "/Category/Polo.webp" },
    { title: "CARGOS", image: "/Category/Cargo.webp" },
    { title: "SHOES", image: "/Category/Shoes.webp" },
    { title: "OVERSHIRTS", image: "/Category/OverShirts.webp" },
    { title: "SUNGLASSES", image: "/Category/SunGlasses.webp" },
];

const Categories = () => {
    return (
        <Wrapper>
            <Heading>FEATURED CATEGORIES</Heading>
            <Flex>
                {categories.map((item, index) => (
                    <CategoryCard
                        key={index}
                        image={item.image}
                        title={item.title}
                    />
                ))}
            </Flex>
        </Wrapper>
    );
};

export default Categories;

const Wrapper = styled.div`
    padding: 60px;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    letter-spacing: 1px;
`;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
`;
