import Category from "../components/Category";
import ShowAllProducts from "../components/ShowAllProducts";
import Slider from "../components/Slider"
const images = [
    "/Slides/slide1.webp",
    "/Slides/slide2.webp",
    "/Slides/slide3.webp",
    "/Slides/slide4.webp",
];
const Home = () => {
    return (
        <>
            <Slider images={images} />
            <Category />
            <ShowAllProducts />
        </>
    )
}

export default Home
