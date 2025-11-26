import { Clapperboard } from "lucide-react";
import { Button } from "./button";
import { SearchInput } from "./searchInput";

function Header() {
  return (
    <div className="w-full p-3 flex h-16 justify-between bg-zinc-900 text-sky-50">
      <div className="flex justify-between">
        <Clapperboard className="h-7 w-7 mt-1 text-blue-800" />
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight pl-4 pt-1">
          CineList
        </h1>
      </div>

      <SearchInput />

      <div className="flex items-center gap-3 pr-2">
        <Button>Login</Button>

        <Button variant="secondary">SignIn</Button>
      </div>
    </div>
  );
}

export default Header;
