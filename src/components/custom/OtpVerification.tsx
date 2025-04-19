import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const OtpModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [resendTime, setResendTime] = useState(30);

  useEffect(() => {
    if (show && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [show]);

  useEffect(() => {
    const isFilled = otp.every(digit => digit !== '');
    setIsComplete(isFilled);
  }, [otp]);

  // Resend countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTime > 0 && show) {
      timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTime, show]);

  const resetOtpForm = () => {
    setOtp(Array(6).fill(''));
    setIsComplete(false);
    setResendTime(30);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    
    pasteData.split('').forEach((char, i) => {
      if (i < 6 && /^\d*$/.test(char)) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);
    
    const lastFilledIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.min(lastFilledIndex - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    resetOtpForm();
    // Add your resend logic here
    console.log('Resending OTP...');
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    // Add your verification logic here
    onClose();
    resetOtpForm();
  };

  return (
    <Modal show={show} onClose={onClose} size="md" popup>
      <ModalHeader className="border-b border-gray-700 bg-[#1a2c38]">
        <h3 className="text-white">OTP Verification</h3>
      </ModalHeader>
      <ModalBody className="bg-[#1a2c38]">
        <div className="text-center">
          <p className="text-gray-400 mb-6 mt-3">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-center space-x-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(el) => el && (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl font-bold bg-[#22303c] border border-[#2a3e4a] rounded-lg text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full mb-4 py-3 px-4 rounded-lg font-medium transition-colors ${
              isComplete
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-400'
            }`}
          >
            Verify OTP
          </button>

          <div className="text-sm">
            <span className="text-gray-500">Didn't receive code?</span>{' '}
            {resendTime > 0 ? (
              <span className="text-gray-400">
                Resend in 00:{resendTime.toString().padStart(2, '0')}
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OtpModal;