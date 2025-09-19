import { useMemo } from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import SortDropdown, { type SortOption } from "./SortDropdown";
import { type Shirt } from "../data/shirts";
import { useStore } from "../store/useStore";

type FavoritesSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  favoriteItems: Shirt[]; 
  onRemoveFavorite: (id: string) => void;
  onAddToCart: (shirt: Shirt) => void;
  cartItems: { shirt: Shirt; quantity: number }[];
};

export default function FavoritesSidebar({
  isOpen,
  onClose,
  favoriteItems,
  onRemoveFavorite,
  onAddToCart,
  cartItems,
}: FavoritesSidebarProps) {
  const { favoritesSortOrder, setFavoritesSortOrder } = useStore();

  const sortedFavorites = useMemo(() => {
    const copy = [...favoriteItems];

    switch (favoritesSortOrder) {
      case "price-asc":
        copy.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        copy.sort((a, b) => b.price - a.price);
        break;
      case "alpha-asc":
        copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-desc":
        copy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        copy.reverse();
        break;
    }

    return copy;
  }, [favoriteItems, favoritesSortOrder]);

  const isInCart = (id: string) => cartItems.some((it) => it.shirt.id === id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Favorites</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4 border-b">
          <SortDropdown value={favoritesSortOrder} onChange={setFavoritesSortOrder} />
        </div>

        <div className="p-4 overflow-y-auto h-full space-y-4">
          {sortedFavorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You don't have any favorites yet</p>
          ) : (
            sortedFavorites.map((shirt) => (
              <div key={shirt.id} className="flex border-b py-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img
                    src={shirt.imageUrl}
                    alt={shirt.name}
                    className="object-cover w-full h-full"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "https://via.placeholder.com/200x200?text=No+Image";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate">{shirt.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm">{shirt.size} | {shirt.color}</p>
                  <p className="text-cyan-500 font-medium">${shirt.price}</p>

                  <div className="flex mt-2 gap-2">
                    <button
                      onClick={() => onAddToCart(shirt)}
                      disabled={isInCart(shirt.id)}
                      className={`px-2 py-1 text-xs md:text-sm rounded ${
                        isInCart(shirt.id) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-cyan-400 text-white hover:bg-cyan-500"
                      }`}
                    >
                      {isInCart(shirt.id) ? "In Cart" : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => onRemoveFavorite(shirt.id)}
                      className="px-2 py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(shirt.id)}
                  className="text-red-500 hover:text-red-700 self-start ml-2"
                >
                  <FaHeart size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}