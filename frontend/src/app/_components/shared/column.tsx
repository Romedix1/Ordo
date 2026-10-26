import { Card, CardProps } from "@/app/_components/shared/card";
import { Button } from "@/app/_components/ui";
import { cn } from "cn";
import { Ellipsis, Plus } from "lucide-react";

interface ColumnProps {
  title: string;
  cards?: CardProps[];
  cardOn?: boolean;
}

export const Column = ({ title, cards, cardOn = false }: ColumnProps) => {
  return (
    <section className="p-3 flex flex-col gap-2 w-72.5 bg-column rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium">
          {title}{" "}
          <span className="ml-1.5 text-muted-foreground">
            {cards ? cards.length : 0}
          </span>
        </h2>

        <Ellipsis className="w-5 h-5 cursor-pointer" />
      </div>

      {!cards
        ? !cardOn && (
            <div
              className={cn(
                "flex flex-col gap-1 p-3",
                "text-muted-foreground border border-dashed border-border-dashed rounded-lg",
              )}
            >
              <h4 className="text-sm">No cards</h4>
              <p className="text-xs">Drag a card here or add a new one</p>
            </div>
          )
        : cards.map((card, index) => {
            return <Card key={`column-${title}-card-${index}`} {...card} />;
          })}

      {cardOn && (
        <div className="h-24 border border-primary border-dashed bg-accent-subtle rounded-lg"></div>
      )}

      <Button variant="ghost">
        <Plus className="w-5 h-5" /> Add card
      </Button>
    </section>
  );
};
