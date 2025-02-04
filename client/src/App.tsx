import { useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import { useViewStore } from "./stores/view";
import { useFetchTournaments, useTournamentStore } from "./stores/tournaments";
import MatchListView from "./components/MatchListView";
import GameList from "./components/GameList";

const App = () => {
  const { loading, error } = useTournamentStore();
  const { mode, setMode } = useViewStore();
  const fetchTournaments = useFetchTournaments();

  useEffect(() => {
    fetchTournaments();
  }, []);

  console.log("Hi");

  useEffect(() => {
    const modeFromPath =
      window.location.pathname === "/gameview" ? "LEAGUE" : "TIMELINE";
    setMode(modeFromPath as "LEAGUE" | "TIMELINE");
  }, [setMode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        {mode === "LEAGUE" ? <GameList /> : <MatchListView />}
      </div>
    </div>
  );
};

export default App;
