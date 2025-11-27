import { useEffect } from "react";
import { AppRouter } from "./router";
import { useUserStore } from "./stores/user-store";

function App() {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AppRouter/>
  );
}

export default App;
