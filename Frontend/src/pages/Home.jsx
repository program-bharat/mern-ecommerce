import Category from "../components/Category";
import Slider from "../components/Slider"
const images = [
    "/Slides/slide1.webp",
    "/Slides/slide2.webp",
    "/Slides/slide3.webp",
];
const Home = () => {
    return (
        <>
            <Slider images={images} />
            <Category />
        </>
    )
}

export default Home
