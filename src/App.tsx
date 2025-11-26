import Header from "./components/header";
import { HighLightMovie } from "./components/highlightMovie";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Header />

      <main>
        <HighLightMovie />

        <div className="p-6">{/* ... */}</div>
      </main>
    </div>
  );
}

export default App;
