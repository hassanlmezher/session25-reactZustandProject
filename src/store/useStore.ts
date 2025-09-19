import { create } from 'zustand';
import { type Shirt } from '../data/shirts';

export type SortOption = "recent" | "price-asc" | "price-desc" | "alpha-asc" | "alpha-desc";

type CartItem = {
  shirt: Shirt;
  quantity: number;
};

interface StoreState {
  selectedBrands: string[];
  selectedSize: string;
  selectedColor: string;
  priceRange: { min: number; max: number };
  searchTerm: string;
  isCartOpen: boolean;
  isFavoritesOpen: boolean;
  favoriteItems: string[];
  cartItems: CartItem[];
  cartSortOrder: SortOption;
  favoritesSortOrder: SortOption;
  isLoading: boolean;
  filteredShirts: Shirt[];
  
  setSelectedBrands: (brands: string[]) => void;
  toggleBrand: (brand: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setSearchTerm: (term: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsFavoritesOpen: (isOpen: boolean) => void;
  toggleFavorite: (shirt: Shirt) => void;
  addToCart: (shirt: Shirt) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  removeFavorite: (id: string) => void;
  setCartSortOrder: (sortOrder: SortOption) => void;
  setFavoritesSortOrder: (sortOrder: SortOption) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFilteredShirts: (shirts: Shirt[]) => void;
  clearAllFilters: () => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedBrands: [],
  selectedSize: '',
  selectedColor: '',
  priceRange: { min: 0, max: 100 },
  searchTerm: '',
  isCartOpen: false,
  isFavoritesOpen: false,
  favoriteItems: [],
  cartItems: [],
  cartSortOrder: 'recent',
  favoritesSortOrder: 'recent',
  isLoading: true,
  filteredShirts: [],
  
  setSelectedBrands: (brands) => set({ selectedBrands: brands }),
  toggleBrand: (brand) => set((state) => {
    const isSelected = state.selectedBrands.includes(brand);
    if (isSelected) {
      return {
        selectedBrands: state.selectedBrands.filter(b => b !== brand)
      };
    } else {
      return {
        selectedBrands: [...state.selectedBrands, brand]
      };
    }
  }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setIsFavoritesOpen: (isOpen) => set({ isFavoritesOpen: isOpen }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  setFilteredShirts: (shirts) => set({ filteredShirts: shirts }),
  
  toggleFavorite: (shirt) => set((state) => ({
    favoriteItems: state.favoriteItems.includes(shirt.id)
      ? state.favoriteItems.filter((id) => id !== shirt.id)
      : [...state.favoriteItems, shirt.id]
  })),
  
  addToCart: (shirt) => set((state) => {
    const existingItem = state.cartItems.find((item) => item.shirt.id === shirt.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map((item) =>
          item.shirt.id === shirt.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    } else {
      return {
        cartItems: [...state.cartItems, { shirt, quantity: 1 }]
      };
    }
  }),
  
  updateCartQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) return state;
    return {
      cartItems: state.cartItems.map((item) =>
        item.shirt.id === id ? { ...item, quantity } : item
      )
    };
  }),
  
  removeFromCart: (id) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.shirt.id !== id)
  })),
  
  removeFavorite: (id) => set((state) => ({
    favoriteItems: state.favoriteItems.filter((itemId) => itemId !== id)
  })),
  
  setCartSortOrder: (sortOrder) => set({ cartSortOrder: sortOrder }),
  setFavoritesSortOrder: (sortOrder) => set({ favoritesSortOrder: sortOrder }),
  
  clearAllFilters: () => set({
    selectedBrands: [],
    selectedSize: '',
    selectedColor: '',
    priceRange: { min: 0, max: 100 }
  })
}));