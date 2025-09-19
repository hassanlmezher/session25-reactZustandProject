import Items from "./Items";
import Options from "./Options";
import { useStore } from "../store/useStore";

function Shop() {
  const {
    selectedBrands,
    selectedSize,
    selectedColor,
    priceRange,
    toggleBrand,
    setSelectedSize,
    setSelectedColor,
    setPriceRange,
    searchTerm,
    toggleFavorite,
    addToCart,
    favoriteItems,
    cartItems
  } = useStore();

  return (
    <div className="p-4 md:pl-10 md:pt-7">
      <p className="flex justify-between w-27 text-sm md:text-base">
        <span className="text-cyan-400">Home</span> ➢ Clothes
      </p>
      <p className="text-black font-bold text-lg md:text-xl mt-2">Clothes</p>
      <div className="flex flex-col md:flex-row mt-5 gap-4 md:gap-6">
        <Options
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <Items
          selectedBrands={selectedBrands}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          priceRange={priceRange}
          searchTerm={searchTerm}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          favoriteItems={favoriteItems}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

export default Shop;