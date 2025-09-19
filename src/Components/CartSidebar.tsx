import { useMemo } from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import SortDropdown, { type SortOption } from "./SortDropdown";
import { type Shirt } from "../data/shirts";
import { useStore } from "../store/useStore";

type CartItem = {
  shirt: Shirt;
  quantity: number;
};

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const { cartSortOrder, setCartSortOrder } = useStore();

  const sortedItems = useMemo(() => {
    const copy = [...cartItems];

    switch (cartSortOrder) {
      case "price-asc":
        copy.sort((a, b) => a.shirt.price - b.shirt.price);
        break;
      case "price-desc":
        copy.sort((a, b) => b.shirt.price - a.shirt.price);
        break;
      case "alpha-asc":
        copy.sort((a, b) => a.shirt.name.localeCompare(b.shirt.name));
        break;
      case "alpha-desc":
        copy.sort((a, b) => b.shirt.name.localeCompare(a.shirt.name));
        break;
      default:
        copy.reverse();
        break;
    }

    return copy;
  }, [cartItems, cartSortOrder]);

  const total = cartItems.reduce((sum, item) => sum + item.shirt.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4 border-b">
          <SortDropdown value={cartSortOrder} onChange={setCartSortOrder} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sortedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            sortedItems.map((item) => (
              <div key={item.shirt.id} className="flex border-b pb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src={item.shirt.imageUrl}
                    alt={item.shirt.name}
                    className="object-cover w-full h-full"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "https://via.placeholder.com/200x200?text=No+Image";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate">{item.shirt.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {item.shirt.size} | {item.shirt.color}
                  </p>
                  <p className="text-cyan-500 font-medium">${item.shirt.price}</p>

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.shirt.id, item.quantity - 1)}
                      className="p-1 border rounded-l"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="px-3 py-1 border-t border-b text-sm">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.shirt.id, item.quantity + 1)}
                      className="p-1 border rounded-r"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.shirt.id)}
                  className="text-gray-400 hover:text-red-500 self-start ml-2"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t bg-white p-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600">Checkout</button>
        </div>
      </div>
    </div>
  );
}