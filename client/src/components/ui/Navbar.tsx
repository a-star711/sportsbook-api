import { useViewStore } from "@/stores/view";
import CustomController from "../../assets/CustomController";

function Navbar() {
  const { mode, toggleMode } = useViewStore();

  return (
    <header className="flex items-center justify-start p-5 bg-primary">
      <div className="flex items-center space-x-3">
        <CustomController className="text-white w-8 h-8" />
        <h4 className="text-white text-xl font-semibold">Esports</h4>
      </div>
      <button
        className="ml-5 py-2 px-4 bg-accent text-white rounded-xl hover:bg-muted transition-colors"
        onClick={toggleMode}
      >
        {mode === "LEAGUE" ? "Sort by Time" : "Sort by Game"}
      </button>
    </header>
  );
}

export default Navbar;
