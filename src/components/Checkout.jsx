import { useAppContext } from "../contexts/AppContext";

const Checkout = () => {
  const { setShowCheckoutModal } = useAppContext();

  return (
    <div
      onClick={() => setShowCheckoutModal(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-99 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 m-auto items-start p-8 py-8 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      ></div>
    </div>
  );
};

export default Checkout;
