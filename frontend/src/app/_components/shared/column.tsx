import { CardProps, SortableCard } from "@/app/_components/shared";
import { Button } from "@/app/_components/ui";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "cn";
import { Ellipsis, Plus } from "lucide-react";

export interface ColumnProps {
  id: string;
  title: string;
  cards?: CardProps[];
  cardOn?: boolean;
  isDragging?: boolean;
}

export const Column = ({
  id,
  title,
  cards,
  cardOn = false,
  isDragging,
}: ColumnProps) => {
  return (
    <section
      className={cn(
        "p-3 flex flex-col gap-2 w-72.5 bg-column rounded-xl cursor-pointer select-none",
        isDragging
          ? "rotate-2 border-ring opacity-90 cursor-grab"
          : "cursor-pointer",
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium">
          {title}{" "}
          <span className="ml-1.5 text-muted-foreground">
            {cards ? cards.length : 0}
          </span>
        </h2>

        <Ellipsis className="w-5 h-5 cursor-pointer" />
      </div>

      {!cards ? (
        !cardOn && (
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
      ) : (
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <SortableCard key={card.id} {...card} />
          ))}
        </SortableContext>
      )}

      <Button variant="ghost">
        <Plus className="w-5 h-5" /> Add card
      </Button>
    </section>
  );
};
