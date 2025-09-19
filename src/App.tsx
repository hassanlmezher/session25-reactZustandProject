import Header from "./Components/Header";
import Options from "./Components/Options";
import Items from "./Components/Items";
import CartSidebar from "./Components/CartSidebar";
import FavoritesSidebar from "./Components/FavoritesSidebar";
import { useStore } from "./store/useStore";
import shirts from "./data/shirts";

function App() {
  const {
    selectedBrands,
    selectedSize,
    selectedColor,
    priceRange,
    searchTerm,
    isCartOpen,
    isFavoritesOpen,
    favoriteItems,
    cartItems,
    setSearchTerm,
    setIsCartOpen,
    setIsFavoritesOpen,
    toggleFavorite,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    removeFavorite,
    toggleBrand,
    setSelectedSize,
    setSelectedColor,
    setPriceRange
  } = useStore();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const favoriteShirts = shirts.filter((shirt) => favoriteItems.includes(shirt.id));

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        favoritesCount={favoriteItems.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          <aside className="w-full lg:w-72 flex-shrink-0">
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
          </aside>

          <section className="flex-1 min-w-0 w-full">
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
          </section>
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />

      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteShirts}
        onRemoveFavorite={removeFavorite}
        onAddToCart={addToCart}
        cartItems={cartItems}
      />
    </div>
  );
}

export default App;