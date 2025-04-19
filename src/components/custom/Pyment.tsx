import { useState } from "react";

type PaymentMethod = "USDT_TRC20" | "USDT_Polygon";

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
}

const PaymentCard = () => {
  const [activeTab, setActiveTab] = useState<PaymentMethod>("USDT_TRC20");
  const [copied, setCopied] = useState<boolean>(false);

  const paymentMethods: PaymentMethodOption[] = [
    { id: "USDT_TRC20", label: "USDT (TRC20)" },
    { id: "USDT_Polygon", label: "USDT (Polygon)" },
  ];

  const walletAddresses: Record<PaymentMethod, string> = {
    USDT_TRC20: "TNPdJ5hFr1J5eTDJ5hFr1J5eTDJ5hFr1J5",
    USDT_Polygon: "0x5hFr1J5eTDJ5hFr1J5eTDJ5hFr1J5eTDJ5",
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-[#1a2c38] border border-[#2a3e4a]">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        Complete Your Payment
      </h2>

      <div className="mb-6">
        <p className="text-gray-300 mb-2 text-sm">Select Payment Method</p>
        <div className="flex space-x-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setActiveTab(method.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === method.id
                  ? "bg-[#2a3e4a] text-white"
                  : "bg-[#22303c] text-gray-300 hover:bg-[#2a3e4a]"
              }`}
            >
              {method.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#22303c] p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Wallet Address</span>
          <button
            onClick={() => copyToClipboard(walletAddresses[activeTab])}
            className="text-xs bg-[#1a2c38] hover:bg-[#2a3e4a] px-2 py-1 rounded text-blue-400"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="bg-[#1a2c38] p-3 rounded font-mono text-sm text-white break-all">
          {walletAddresses[activeTab]}
        </div>
      </div>

      <div className="bg-[#22303c] p-4 rounded-lg mb-6">
        <p className="text-gray-400 text-sm mb-2">Payment Amount</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-white">$100.00</span>
          <span className="text-gray-300 text-sm">Balance payment</span>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6">
        <p className="text-yellow-400 text-sm text-center">
          Please send exactly $100.00 USDT to the address above
        </p>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
        I've Sent the Payment
      </button>
    </div>
  );
};

export default PaymentCard;
