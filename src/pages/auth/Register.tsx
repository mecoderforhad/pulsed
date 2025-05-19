import { useEffect, useState } from "react";
import RegisterRefer from "../../components/custom/RegisterRefer";
import { useLocation } from "react-router-dom";

export default function Register() {
  const location = useLocation();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");

    if (ref) {
      setReferralCode(ref);
      localStorage.setItem("referralCode", ref);
    }
  }, [location.search]);

  return <RegisterRefer referralCode={referralCode}/>;
}
