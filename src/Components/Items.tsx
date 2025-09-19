import { useEffect } from "react";
import shirts, { type Shirt } from "../data/shirts";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useStore } from "../store/useStore";

type ItemsProps = {
  selectedBrands: string[];
  selectedSize: string;
  selectedColor: string;
  priceRange: { min: number; max: number };
  searchTerm: string;
  onAddToCart: (shirt: Shirt) => void;
  onToggleFavorite: (shirt: Shirt) => void;
  favoriteItems: string[];
  cartItems: { shirt: Shirt; quantity: number }[];
};

function Items({
  selectedBrands,
  selectedSize,
  selectedColor,
  priceRange,
  searchTerm,
  onAddToCart,
  onToggleFavorite,
  favoriteItems,
  cartItems,
}: ItemsProps) {
  const { isLoading, setIsLoading, filteredShirts, setFilteredShirts } = useStore();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = shirts.filter((shirt: Shirt) => {
        const brandMatch =
          selectedBrands.length === 0 || selectedBrands.includes(shirt.brand);
        const sizeMatch =
          !selectedSize || selectedSize === "All" || shirt.size === selectedSize;
        const colorMatch =
          !selectedColor || selectedColor === "All" || shirt.color === selectedColor;
        const priceMatch =
          shirt.price >= priceRange.min && shirt.price <= priceRange.max;

        const searchMatch =
          !searchTerm ||
          shirt.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shirt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shirt.color.toLowerCase().includes(searchTerm.toLowerCase());

        return brandMatch && sizeMatch && colorMatch && priceMatch && searchMatch;
      });

      setFilteredShirts(filtered);
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedBrands, selectedSize, selectedColor, priceRange, searchTerm, setIsLoading, setFilteredShirts]);

  const isFavorite = (id: string) => favoriteItems.includes(id);
  const isInCart = (id: string) => cartItems.some((item) => item.shirt.id === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        <span className="ml-3 text-gray-500">Loading shirts...</span>
      </div>
    );
  }

  if (filteredShirts.length === 0) {
    return (
      <div className="text-center w-full py-8">
        <p className="text-gray-500 text-lg mb-2">No items match your filters.</p>
        <p className="text-gray-400 text-sm">Try adjusting your search criteria or clearing some filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Showing {filteredShirts.length} of {shirts.length} products
          {selectedBrands.length > 0 && (
            <span className="ml-2">
              • Brands: {selectedBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')}
            </span>
          )}
          {(priceRange.min > 0 || priceRange.max < 100) && (
            <span className="ml-2">
              • Price: ${priceRange.min} - ${priceRange.max}
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-6 justify-center">
        {filteredShirts.map((shirt) => (
          <article
            key={shirt.id}
            className="flex flex-col h-full bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition relative mx-auto w-full"
          >

            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => onToggleFavorite(shirt)}
                className="text-xl bg-white rounded-full p-1 shadow-sm"
                aria-label={`favorite-${shirt.id}`}
                title={isFavorite(shirt.id) ? "Remove favorite" : "Add favorite"}
              >
                {isFavorite(shirt.id) ? <FaHeart className="text-red-500" /> : <CiHeart />}
              </button>
            </div>

            <div className="absolute top-3 left-3 z-10">
              <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full font-medium">
                {shirt.brand.charAt(0).toUpperCase() + shirt.brand.slice(1)}
              </span>
            </div>

            <div className="w-full h-40 md:h-48 mb-3 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
              <img
                src={shirt.imageUrl}
                alt={shirt.name}
                className="max-h-full max-w-full object-contain"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = "https://via.placeholder.com/200x200?text=No+Image";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            <div className="flex-1 flex flex-col items-center text-center min-w-0">
              <p className="font-bold text-sm md:text-base truncate w-full">{shirt.name}</p>
              <p className="text-gray-500 mt-1 text-xs md:text-sm w-full truncate">
                {shirt.size} | {shirt.color}
              </p>
              <p className="text-cyan-500 mt-2 font-bold w-full">${shirt.price}</p>
            </div>

            <div className="mt-4 w-full">
              <button
                onClick={() => onAddToCart(shirt)}
                disabled={isInCart(shirt.id)}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs md:text-sm focus:outline-none transition ${
                  isInCart(shirt.id)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-cyan-400 text-white hover:bg-cyan-500"
                }`}
                aria-label={`addtocart-${shirt.id}`}
                title={isInCart(shirt.id) ? "Already in cart" : "Add to cart"}
              >
                <CiShoppingCart />
                {isInCart(shirt.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Items;