import RegisterSection from "../components/custom/CustomBanner";
import EcommerceSlider from "../components/custom/EcommerceSlider";
// import VideoGallery from "../components/custom/VideoGallery";

export default function Dashboard() {
  return (
    <div className="custom-gradient">
      <RegisterSection />
      {/* <VideoGallery /> */}
      <EcommerceSlider />
    </div>
  );
}
