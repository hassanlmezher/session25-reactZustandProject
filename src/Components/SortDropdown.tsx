export type SortOption = "recent" | "price-asc" | "price-desc" | "alpha-asc" | "alpha-desc";

type Props = {
  value: SortOption;
  onChange: (v: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-600 block mb-1">Sort by:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-200"
      >
        <option value="recent">Recently added</option>
        <option value="price-asc">Price ascending</option>
        <option value="price-desc">Price descending</option>
        <option value="alpha-asc">Alphabetical ascending</option>
        <option value="alpha-desc">Alphabetical descending</option>
      </select>
    </div>
  );
}