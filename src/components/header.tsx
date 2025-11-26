import { Clapperboard } from "lucide-react";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 flex h-16 items-center justify-between bg-zinc-950/95 backdrop-blur-sm text-sky-50 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Clapperboard className="h-7 w-7 text-blue-600" />
        <h1 className="text-xl font-bold tracking-tight">CineList</h1>
      </div>

      <SearchInput />

      <div className="flex items-center gap-3">
        <Button variant="primary">Login</Button>
        <Button variant="secondary">SignIn</Button>
      </div>
    </header>
  );
}

export default Header;
