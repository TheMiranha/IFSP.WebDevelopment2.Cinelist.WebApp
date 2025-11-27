import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../components/button";
import { authenticate } from "../../../api/cinelist";
import { Clapperboard } from "lucide-react";
import { useUserStore } from "../../../stores/user-store";

function LoginPage() {
  const navigate = useNavigate();
  const fetchUser = useUserStore((state) => state.fetchUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authenticate({ email, password });
      
      if (response.success && response.accessToken) {
        localStorage.setItem("token", response.accessToken);
        await fetchUser();
        navigate("/");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Clapperboard className="h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold tracking-tight mb-2">CineList</h1>
          <p className="text-zinc-400">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-zinc-300">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-300 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            Não tem uma conta?{" "}
            <Link
              to="/auth/register"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

