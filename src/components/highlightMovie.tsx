import { Play, Plus } from "lucide-react";
import { Button } from "./Button";

export function HighLightMovie() {
  return (
    <div className="relative w-full h-[32rem] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
          alt="Filme em Destaque"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 pb-12 flex flex-col justify-end items-start">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Blade Runner 2049
        </h1>

        <p className="text-zinc-300 text-lg mb-8 max-w-2xl line-clamp-3">
          Em um futuro onde as memórias podem ser comercializadas, uma
          mercenária solitária descobre um segredo capaz de derrubar a
          megacorporação que controla a cidade de Neo-Veridia. Agora, ela
          precisa escolher entre vender a verdade ou lutar pela liberdade da
          humanidade.
        </p>

        <div className="flex gap-4">
          <Button
            variant="primary"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Play className="w-4 h-4 fill-current" />
            Assistir Trailer
          </Button>

          <Button
            variant="secondary"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Plus className="w-4 h-4" />
            Adicionar à Lista
          </Button>
        </div>
      </div>
    </div>
  );
}
