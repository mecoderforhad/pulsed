import ProductGrid from "../components/custom/products";
import Slider from "../components/custom/Slider";
import BottomNavbar from "../components/layout/BottomNavbar";
// import VideoGallery from "../components/custom/VideoGallery";

export default function Dashboard() {
  return (
    <>
      <Slider />
      {/* <VideoGallery /> */}
      <ProductGrid />
      <BottomNavbar />
    </>
  );
}
