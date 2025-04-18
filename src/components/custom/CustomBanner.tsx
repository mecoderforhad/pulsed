import { Button } from 'flowbite-react';
import { FaFacebook, FaGoogle, FaLine, FaTwitch } from 'react-icons/fa';

export default function RegisterSection() {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-[#0f1f2a] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column (Register box) */}
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            World's Largest Online <br /> Casino and Sportsbook
          </h1>
          <div className='lg:border lg:border-red-500'>
            <Button color="blue" pill>
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
        </div>

        {/* Right Column (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            title="Casino"
            viewers="90,542"
            image="https://mediumrare.imgix.net/explore-casino-en.png?w=640&h=421&fit=min&auto=format"
            borderColor="border-blue-500"
          />
          <Card
            title="Sports"
            viewers="40,655"
            image="https://mediumrare.imgix.net/explore-sports-en.png?w=640&h=421&fit=min&auto=format"
            borderColor="border-green-500"
          />
        </div>
      </div>
    </section>
  );
}

function IconButton({ icon }) {
  return (
    <button className="bg-[#1a2c38] p-3 rounded-lg hover:bg-[#243b4f] transition">
      {icon}
    </button>
  );
}

function Card({ title, viewers, image, borderColor }) {
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
