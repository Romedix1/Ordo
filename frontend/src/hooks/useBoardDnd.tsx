"use client";

import { ColumnProps } from "@/app/_components/shared";
import {
  closestCorners,
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

export function useBoardDnd(initialColumns: ColumnProps[]) {
  const [columns, setColumns] = useState(() =>
    initialColumns.map((column) => ({ ...column, cards: column.cards ?? [] })),
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  function isColumnId(id: UniqueIdentifier | undefined) {
    return columns.some((column) => column.id === id);
  }

  function findColumnId(id: UniqueIdentifier | undefined) {
    if (isColumnId(id)) return id;

    return columns.find((column) => column.cards.some((card) => card.id === id))
      ?.id;
  }

  const collisionDetection: CollisionDetection = (args) => {
    if (isColumnId(args.active.id)) {
      return closestCorners({
        ...args,
        droppableContainers: args.droppableContainers.filter((container) =>
          isColumnId(container.id),
        ),
      });
    }

    return closestCorners(args);
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;
    if (isColumnId(active.id)) return;

    const activeCardId = active.id;
    const overId = over.id;

    const activeColumnId = findColumnId(activeCardId);
    const overColumnId = findColumnId(overId);

    if (!activeColumnId || !overColumnId) return;
    if (activeColumnId === overColumnId) {
      if (activeCardId === overId || overId === overColumnId) return;

      setColumns((prev) =>
        prev.map((column) => {
          if (column.id !== activeColumnId) return column;

          const oldIndex = column.cards.findIndex(
            (card) => card.id === activeCardId,
          );
          const newIndex = column.cards.findIndex((card) => card.id === overId);

          if (oldIndex === -1 || newIndex === -1) return column;

          return {
            ...column,
            cards: arrayMove(column.cards, oldIndex, newIndex),
          };
        }),
      );

      return;
    }

    setColumns((prev) => {
      const activeColumn = prev.find((column) => column.id === activeColumnId);
      const overColumn = prev.find((column) => column.id === overColumnId);

      if (!activeColumn || !overColumn) return prev;

      const activeCard = activeColumn.cards.find(
        (card) => card.id === activeCardId,
      );

      if (!activeCard) return prev;

      let newIndex: number;

      if (overId === overColumnId) {
        newIndex = overColumn.cards.length;
      } else {
        const overIndex = overColumn.cards.findIndex(
          (card) => card.id === overId,
        );
        newIndex = overIndex >= 0 ? overIndex : overColumn.cards.length;
      }

      return prev.map((column) => {
        if (column.id === activeColumnId) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== activeCardId),
          };
        }

        if (column.id === overColumnId) {
          return {
            ...column,
            cards: [
              ...column.cards.slice(0, newIndex),
              activeCard,
              ...column.cards.slice(newIndex),
            ],
          };
        }

        return column;
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (isColumnId(active.id)) {
      if (over && active.id !== over.id) {
        setColumns((prev) => {
          const oldIndex = prev.findIndex((card) => card.id === active.id);
          const newIndex = prev.findIndex((card) => card.id === over.id);

          if (oldIndex === -1 || newIndex === -1) return prev;

          return arrayMove(prev, oldIndex, newIndex);
        });
      }

      setActiveId(null);
      return;
    }

    if (over && active.id !== over.id) {
      const activeColumnId = findColumnId(active.id);
      const overColumnId = findColumnId(over.id);

      if (activeColumnId && activeColumnId === overColumnId) {
        setColumns((prev) =>
          prev.map((column) => {
            if (column.id !== activeColumnId) return column;

            const oldIndex = column.cards.findIndex(
              (card) => card.id === active.id,
            );
            const newIndex = column.cards.findIndex(
              (card) => card.id === over.id,
            );

            if (oldIndex === -1 || newIndex === -1) return column;

            return {
              ...column,
              cards: arrayMove(column.cards, oldIndex, newIndex),
            };
          }),
        );
      }
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const activeColumn = columns.find((column) => column.id === activeId);

  const activeCard = columns
    .flatMap((column) => column.cards)
    .find((card) => card.id === activeId);

  return {
    columns,
    setColumns,
    activeId,
    activeCard,
    activeColumn,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
