import { Button } from "flowbite-react";
import { FaFacebook, FaGoogle, FaLine, FaTwitch } from "react-icons/fa";
import { ReactElement, useState } from "react";
import Registration from "./Registration";
import { useAuth } from "../../provider/useAuth";

export default function RegisterSection() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const authUser = useAuth();

  return (
    <>
      <section className="w-full px-4 py-8 md:py-16 bg-[#0f1f2a] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              Find Your Furry 🐾
              <br /> Best Friend Today!
            </h1>
            {authUser.token ? (
              ""
            ) : (
              <>
                <div className="lg:block flex items-center justify-center">
                  <Button
                    color="blue"
                    pill
                    onClick={() => setOpenRegistration(!openRegistration)}
                  >
                    Register
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">Or sign up with</p>
                  <div className="flex justify-center lg:justify-start space-x-4">
                    <IconButton icon={<FaFacebook />} />
                    <IconButton icon={<FaGoogle />} />
                    <IconButton icon={<FaLine />} />
                    <IconButton icon={<FaTwitch />} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <Card
              title="Price"
              viewers="$200"
              image="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              borderColor="border-blue-500"
            />
            <Card
              title="Price"
              viewers="$180"
              image="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              borderColor="border-green-500"
            />
          </div>
        </div>
      </section>
      <Registration
        openModal={openRegistration}
        setOpenModal={setOpenRegistration}
      />
    </>
  );
}

type IconButtonProps = {
  icon: ReactElement;
};

function IconButton({ icon }: IconButtonProps) {
  return (
    <button className="bg-[#1a2c38] p-3 rounded-lg hover:bg-[#243b4f] transition">
      {icon}
    </button>
  );
}

type CardProps = {
  title: string;
  viewers: string;
  image: string;
  borderColor: string;
};

function Card({ title, viewers, image, borderColor }: CardProps) {
  return (
    <div
      className={`bg-[#1a2c38] rounded-xl overflow-hidden shadow-md border-2 ${borderColor}`}
    >
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-medium">
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 9.8l-10-5V17l10 5 10-5V6.8l-10 5z" />
          </svg>
          {title}
        </span>
        <span className="text-green-400 font-semibold">{viewers}</span>
      </div>
    </div>
  );
}
