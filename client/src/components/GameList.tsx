import { useEffect, useMemo, useRef } from "react";
import { useTournamentStore } from "../stores/tournaments";
import GameAccordion from "./GameAccordion";
import BackToTopButton from "./ui/Button";

const GameList = () => {
  const {
    getGroupedTournaments,
    loadMoreTournaments,
    hasMoreTournaments,
    loading,
  } = useTournamentStore();

  const groupedTournaments = useMemo(
    () => getGroupedTournaments(),
    [getGroupedTournaments]
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreTournaments && !loading) {
          loadMoreTournaments();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMoreTournaments, loading, loadMoreTournaments]);

  return (
    <>
      {Object.entries(groupedTournaments).map(([game, tournaments], index) => (
        <GameAccordion
          key={game}
          game={game}
          tournaments={tournaments}
          isInitiallyOpen={index < 2}
        />
      ))}

      <div ref={observerRef} className="h-10 text-center">
        {loading
          ? "Loading more tournaments..."
          : hasMoreTournaments || <BackToTopButton />}
      </div>
    </>
  );
};

export default GameList;
