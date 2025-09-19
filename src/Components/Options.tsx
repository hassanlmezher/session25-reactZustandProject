import {
  SiNike,
  SiAdidas,
  SiNewbalance,
  SiPuma,
  SiUniqlo,
} from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { useStore } from "../store/useStore";

type OptionsProps = {
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  selectedSize: string;
  setSelectedSize: (s: string) => void;
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
};

function Options({
  selectedBrands,
  toggleBrand,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  priceRange,
  setPriceRange,
}: OptionsProps) {
  const { clearAllFilters } = useStore();

  const brands = [
    { name: "nike", icon: <SiNike className="text-xl md:text-2xl" /> },
    { name: "adidas", icon: <SiAdidas className="text-xl md:text-2xl" /> },
    { name: "apple", icon: <FaApple className="text-xl md:text-2xl" /> },
    { name: "newbalance", icon: <SiNewbalance className="text-xl md:text-2xl" /> },
    { name: "puma", icon: <SiPuma className="text-xl md:text-2xl" /> },
    { name: "uniqlo", icon: <SiUniqlo className="text-xl md:text-2xl" /> },
  ];

  const sizes = ["All", "XXS", "XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    { name: "black", className: "bg-black" },
    { name: "white", className: "bg-white border border-gray-400" },
    { name: "red", className: "bg-red-500" },
    { name: "yellow", className: "bg-yellow-400" },
    { name: "green", className: "bg-green-500" },
    { name: "blue", className: "bg-blue-500" },
    { name: "purple", className: "bg-purple-600" },
    { name: "darkblue", className: "bg-blue-900" },
    { name: "orange", className: "bg-orange-500" },
    { name: "cyan", className: "bg-cyan-400" },
  ];

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setPriceRange({ ...priceRange, min: newMin });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setPriceRange({ ...priceRange, max: newMax });
  };

  return (
    <div className="w-full lg:w-72">
      <div className="bg-gray-100 rounded-2xl p-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-auto">
        <div className="flex items-center justify-between">
          <p className="font-medium">Filter</p>
          <button
            onClick={clearAllFilters}
            className="text-red-500 text-sm cursor-pointer hover:text-red-700"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-2xl p-3 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Brand</p>
            <span className="text-xs text-gray-500">
              {selectedBrands.length > 0 && `${selectedBrands.length} selected`}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 mt-3">
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => toggleBrand(brand.name)}
                className={`p-2 flex items-center gap-2 font-medium w-full rounded text-left transition-colors ${
                  selectedBrands.includes(brand.name)
                    ? "bg-cyan-300 text-cyan-800"
                    : "hover:bg-gray-50"
                }`}
              >
                {brand.icon} 
                <span className="capitalize">{brand.name}</span>
                {selectedBrands.includes(brand.name) && (
                  <span className="ml-auto text-cyan-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Price Range</p>
            <button
              onClick={() => setPriceRange({ min: 0, max: 100 })}
              className="text-gray-500 hover:text-red-500 text-xs"
            >
              Reset
            </button>
          </div>
          
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-8">Min:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium w-12">${priceRange.min}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-8">Max:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium w-12">${priceRange.max}</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <input
                type="number"
                min="0"
                max="100"
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                max="100"
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Size</p>
            <button onClick={() => setSelectedSize("")} aria-label="clear size">✕</button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size === "All" ? "" : size)}
                className={`border-2 w-full h-10 flex items-center justify-center rounded text-sm ${
                  (size === "All" && selectedSize === "") || selectedSize === size
                    ? "border-cyan-500"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">Color</p>
            <button onClick={() => setSelectedColor("")} aria-label="clear color">✕</button>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name === selectedColor ? "" : c.name)}
                className={`w-8 h-8 md:w-6 md:h-6 rounded-full ${c.className} ${
                  selectedColor === c.name ? "ring-2 ring-cyan-500 ring-offset-2" : ""
                }`}
                title={c.name}
                aria-label={`color-${c.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;