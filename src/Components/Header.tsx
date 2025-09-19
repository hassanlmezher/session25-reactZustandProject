import { TiShoppingCart } from "react-icons/ti";
import { CiHeart } from "react-icons/ci";
import { useStore } from "../store/useStore";

type HeaderProps = {
  onSearch: (searchTerm: string) => void;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  cartItemsCount: number;
  favoritesCount: number;
};

function Header({
  onSearch,
  onCartClick,
  onFavoritesClick,
  cartItemsCount,
  favoritesCount,
}: HeaderProps) {
  const { searchTerm, setSearchTerm } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">

        <div className="flex-shrink-0">
          <span className="text-2xl font-bold tracking-wide">FASHIONSTORE</span>
        </div>


        <div className="flex-1 min-w-0">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <input
              type="text"
              placeholder="⌕ What are you looking for?"
              className="w-full max-w-2xl h-10 rounded-xl border border-gray-300 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </form>
        </div>


        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={onCartClick}>
            <TiShoppingCart className="text-2xl sm:text-3xl" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </div>

          <div className="relative cursor-pointer" onClick={onFavoritesClick}>
            <CiHeart className="text-2xl sm:text-3xl" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {favoritesCount}
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-6 h-4 bg-blue-500 rounded"></div>
            <p className="text-sm">English</p>
            <span className="text-gray-300">|</span>
            <button className="bg-gray-200 px-3 py-1 font-bold rounded-full hover:bg-gray-300">
              AR
            </button>
            <div className="ml-2 text-right leading-tight">
              <p className="text-gray-400 text-xs">Welcome Back!</p>
              <p className="font-bold text-sm">Abdel Rahman</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;