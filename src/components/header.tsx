import { useNavigate } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { Button } from "./button";
import { SearchInput } from "./search-input";
import { UserMenu } from "./user-menu";
import { useUserStore } from "../stores/user-store";

function Header() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 flex h-16 items-center justify-between bg-zinc-950/95 backdrop-blur-sm text-sky-50 border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <Clapperboard className="h-7 w-7 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">CineList</h1>
      </div>

      <SearchInput />

      <div className="flex items-center gap-3">
        {user ? (
          <UserMenu />
        ) : (
          <>
            <Button variant="primary" onClick={() => navigate("/auth/login")}>
              SignIn
            </Button>
            <Button variant="secondary" onClick={() => navigate("/auth/register")}>
              SignUp
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
