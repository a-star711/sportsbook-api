import React, { useEffect, useRef, Suspense } from "react";
import { useLoadMoreMatches, useTournamentStore } from "@/stores/tournaments";
import SkeletonTable from "./ui/SkeletonTable";
import { typeOfbets } from "@/utils/helpers";
import BackToTopButton from "./ui/Button";

const MatchTable = React.lazy(() => import("./MatchTable"));

const MatchListView = () => {
  const { getTimeAwareGroupedMatches, loading, hasMore } = useTournamentStore();
  const loadMoreMatches = useLoadMoreMatches();

  const groupedMatches = getTimeAwareGroupedMatches();
  const observerRef = useRef<HTMLDivElement>(null);
  const setCache = useTournamentStore((state) => state.setCache);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMoreMatches();
        }
      },
      {
        root: null,
        rootMargin: "150px",
        threshold: 0.01,
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading, loadMoreMatches]);

  useEffect(() => {
    setCache(groupedMatches);
  }, [groupedMatches, setCache]);

  return (
    <div className="space-y-2">
      {Object.entries(groupedMatches).map(([league, dateGroups]) => (
        <section key={league} className="bg-card rounded-lg p-4">
          <div className="grid grid-cols-[1fr_424px] max-xs:grid-cols-[1fr_130px] items-center h-8 mb-2  bg-secondary  ">
            <h2 className="text-lg font-semibold">{league}</h2>
            <div className="grid grid-cols-3 gap-4 lg:w-[410px] max-xs:w-[118px]">
              <span className="text-center font-semibold text-black text-sm">
                {typeOfbets.optionOne}
              </span>
              <span className="text-center font-semibold text-black text-sm">
                {typeOfbets.optionTie}
              </span>
              <span className="text-center font-semibold text-black text-sm">
                {typeOfbets.optionTwo}
              </span>
            </div>
          </div>
          {dateGroups.map(({ matches }, index) => (
            <div key={index}>
              <Suspense fallback={<SkeletonTable />}>
                <MatchTable matches={matches} league={league} />
              </Suspense>
            </div>
          ))}
        </section>
      ))}
      <div ref={observerRef} className="h-10 text-center">
        {loading
          ? "Loading more tournaments..."
          : hasMore || <BackToTopButton />}
      </div>
    </div>
  );
};

export default MatchListView;
