import RegisterSection from "../components/custom/CustomBanner";
import EcommerceSlider from "../components/custom/EcommerceSlider";

export default function Home() {
  return (
    <div className="custom-gradient">
      <RegisterSection />
      {/* <VideoGallery /> */}
      <EcommerceSlider />
    </div>
  );
}
