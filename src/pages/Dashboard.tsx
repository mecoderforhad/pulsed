import ProductGrid from "../components/custom/products";
import Slider from "../components/custom/Slider";
// import VideoGallery from "../components/custom/VideoGallery";

export default function Dashboard() {
  return (
    <div className="custom-gradient">
      <Slider />
      {/* <VideoGallery /> */}
      <ProductGrid />
    </div>
  );
}
