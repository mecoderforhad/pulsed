import { Card } from "flowbite-react";
import {
  HiOutlineTrendingUp,
  HiOutlineCash,
  HiOutlineChartBar,
} from "react-icons/hi";
import { useAuth } from "../../provider/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"

const UserProfile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/users/${user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
              method:"GET"
            }
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
  
          const data = await response.json();
          setUserInfo(data);
        } catch (err: any) {
          console.log(err.message);
          Swal.fire("Error", err.message, "error");
        } 
        
        // finally {
        //   setLoading(false);
        // }
      };
  
      fetchProducts();
    }, [user?.token]);

  return (
    <div className="flex justify-center p-6 mt-10 text-white">
      <Card className="max-w-md w-full bg-gray-800 shadow-xl border-none">
        <div className="flex flex-col items-center text-center">
          <img
            src="/assets/avatar.jpg"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 object-cover"
          />
          <h2 className="text-xl font-semibold mb-1">{userInfo?.name}</h2>
          <p className="text-sm text-gray-400">{userInfo?.phoneNumber}</p>
        </div>

        {/* Profit Section with Icons */}
        <div className="mt-6 grid grid-cols-1 gap-3 text-sm px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <HiOutlineTrendingUp className="text-purple-400" />
              <span>Profit of the day</span>
            </div>
            <span className="font-semibold text-white">
              {/* ${user.profitToday.toFixed(3)} */} 0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <HiOutlineCash className="text-green-400" />
              <span>Cashable profits</span>
            </div>
            <span className="font-semibold text-white">
              {/* ${user.cashableProfits.toFixed(3)} */}0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <HiOutlineChartBar className="text-blue-400" />
              <span>Total profit</span>
            </div>
            <span className="font-semibold text-white">
              ${userInfo?.wallet?.balance?.toFixed(3) || 0}
            </span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">
            Withdraw Money
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
