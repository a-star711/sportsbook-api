import { ReactNode, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import TournamentSectionView from "./TournamentSectionView";
import type { Event } from "@/types/types";

interface GameAccordionProps {
  game: string;
  tournaments: Event[];
  isInitiallyOpen: boolean;
}

const GameAccordion = ({
  game,
  tournaments,
  isInitiallyOpen,
}: GameAccordionProps) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const defaultAccordionValue = tournaments
    .slice(0, 1)
    .map((t) => String(t.id));

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (value: ReactNode) => {
    setIsOpen(value === game);
  };

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={isOpen ? game : undefined}
      onValueChange={handleChange}
    >
      <AccordionItem value={game}>
        <AccordionTrigger
          onClick={handleToggle}
          className="text-lg font-bold text-white mt-0.5 bg-primary pl-2"
        >
          {game.toUpperCase()}
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="multiple" defaultValue={defaultAccordionValue}>
            {tournaments.map((tournament) => (
              <TournamentSectionView
                key={tournament.id}
                tournament={tournament}
              />
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default GameAccordion;
