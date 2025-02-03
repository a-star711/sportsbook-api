import React, { Suspense } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
const MatchTable = React.lazy(() => import("./MatchTable"));

import SkeletonTable from "./ui/SkeletonTable";
import { typeOfbets } from "@/utils/helpers";
import { TournamentSectionProps } from "@/types/types";

const TournamentSectionView = ({ tournament }: TournamentSectionProps) => {
  return (
    <AccordionItem value={tournament.id.toString()}>
      <AccordionTrigger className="hover:no-underline px-3 py-2 w-full group">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-left text-base font-semibold sm:text-lg">
            {tournament.leagueName}
          </h2>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 pt-2">
        <div className="grid grid-cols-[1fr_424px] max-xs:grid-cols-[1fr_130px] items-center mb-2 bg-secondary">
          <div className="opacity-0 pointer-events-none text-sm">
            Placeholder for alignment
          </div>
          <div className="grid grid-cols-3 gap-2 lg:w-[410px] max:xs-w[118]">
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

        <Suspense fallback={<SkeletonTable />}>
          <MatchTable
            matches={tournament.matches}
            league={tournament.leagueName}
          />
        </Suspense>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TournamentSectionView;
