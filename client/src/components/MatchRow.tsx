import { MatchTableProps } from "../types/types";
import { formatDate } from "../utils/helpers";
import OddsCell from "./ui/OdssCell";

interface MatchRowProps {
  match: MatchTableProps["matches"][0];
}

const MatchRow = ({ match }: MatchRowProps) => {
  const matchWinnerBet = match.bets.find((bet) => bet.name === "Match Winner");
  const [team1, team2] = match.name.split(" - ");
  const odds = matchWinnerBet?.odds || [];
  const odd1 = odds.find((odd) => odd.name === "1")?.value || false;
  const oddX = odds.find((odd) => odd.name === "X")?.value || "-";
  const odd2 = odds.find((odd) => odd.name === "2")?.value || false;

  return (
    <div key={match.id} className="bg-white p-2 border-b-2">
      <div className="grid grid-cols-[minmax(0,1fr)_420px] max-xs:grid-cols-[minmax(0,1fr)_118px] items-center">
        <div className="flex items-center text-center sm:gap-2 xs:h-8 min-w-0 max-xs:flex-col max-xs:h-20 max-xs:justify-center max-xs:gap-1">
          <div className="flex flex-row gap-6 ml-6 items-center text-center max-xs:flex-col max-xs:gap-1">
            <span className="text-base text-black font-semibold whitespace-nowrap mr-10 max-xs:mr-0">
              {formatDate(match.startDate)}
            </span>
            <span className="text-base font-medium text-primary max-xs:w-full max-xs:truncate max-xs:text-sm">
              {team1}
            </span>
            <span className="text-base text-primary shrink-0 max-xs:py-0 max-xs:text-sm">
              -
            </span>
            <span className="text-base font-medium text-primary max-xs:w-full max-xs:truncate max-xs:text-sm">
              {team2}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-[420px] max-xs:w-[118px] max-xs:pt-4 max-xs:pr-2 border-x-2 max-xs:border-none">
          <OddsCell value={odd1} />
          <OddsCell value={oddX} />
          <OddsCell value={odd2} />
        </div>
      </div>
    </div>
  );
};

export default MatchRow;
