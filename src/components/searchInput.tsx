import { Search } from "lucide-react";

export function SearchInput(props) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Ícone posicionado absolutamente à esquerda */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        <Search className="h-4 w-4" />
      </div>

      <input
        {...props}
        type="text"
        placeholder="Search"
        className="h-10 w-64 rounded-md bg-zinc-800 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
      />
    </div>
  );
}
