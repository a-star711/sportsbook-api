import { memo, useMemo } from "react";
import { MatchTableProps } from "../types/types";
import MatchRow from "./MatchRow";

const MatchTable = memo(({ matches }: MatchTableProps) => {
  const memoizedMatches = useMemo(() => matches, [matches]);

  return (
    <div className="space-y-2">
      {memoizedMatches.map((match) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </div>
  );
});

export default MatchTable;
