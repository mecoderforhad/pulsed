export default function ActiveIndicator({ position = "top-2 right-2", size = "w-4 h-4" }) {
  return (
    <>
      <div
        className={`absolute ${position} ${size} rounded-full bg-green-500`}
        style={{
          animation: "pulse-glow 2s infinite ease-in-out",
          boxShadow: "0 0 0 0 rgba(34,197,94, 0.7)",
        }}
      />
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </>
  );
}