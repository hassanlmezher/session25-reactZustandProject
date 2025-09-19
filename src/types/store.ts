export interface StoreState {
  data: unknown;
  loading: boolean;
  error: string | null;
  
  setData: (newData: unknown) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateData: (newData: unknown) => void;
  fetchData: (url: string) => Promise<void>;
  reset: () => void;
}

export interface AppState extends StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
}