import { useLocation } from "react-router-dom";
import PaymentCard from "../components/custom/Pyment";

export default function Payment() {
  const location = useLocation();
  const { product } = location.state || {};

  console.log("product-->", product)

  return (
    <div className="mt-5">
      <PaymentCard product={product} />
    </div>
  );
}
