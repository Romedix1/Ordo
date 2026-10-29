"use client";

import { Card, Column } from "@/app/_components/shared";
import { SortableColumn } from "@/app/_components/shared/sortable-column";
import { useBoardDnd } from "@/hooks/useBoardDnd";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";

export default function Home() {
  const mockUsers = [
    { id: "1", initials: "MK" },
    { id: "2", initials: "AN" },
  ];

  const mockCards = [
    {
      id: "card-1",
      title: "Set up CI pipeline for the API",
      badges: [
        { id: "1", title: "Backend", color: "indigo" },
        { id: "2", title: "DevOps", color: "amber" },
      ],
      commentsCount: 2,
      assignedUsers: [mockUsers[0]],
    },
    {
      id: "card-2",
      title: "Create responsive dashboard layout",
      badges: [{ id: "3", title: "Frontend", color: "sky" }],
      commentsCount: 5,
      assignedUsers: [mockUsers[0], mockUsers[1]],
    },
    {
      id: "card-3",
      title: "TEST",
      badges: [{ id: "4", title: "Frontend", color: "sky" }],
      commentsCount: 5,
      assignedUsers: [mockUsers[0], mockUsers[1]],
    },
  ];

  const [mockContainers, setMockContainers] = useState([
    {
      id: "todo",
      title: "To Do",
      cards: [mockCards[0]],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [mockCards[1], mockCards[2]],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ]);

  const {
    columns,
    activeCard,
    activeColumn,
    collisionDetection,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useBoardDnd(mockContainers);

  const columnSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  return (
    <div className="flex items-start pt-48 flex-1  justify-center bg-zinc-50 dark:bg-black  gap-4">
      <DndContext
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={columnSensors}
      >
        <SortableContext
          items={columns.map((card) => card.id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <SortableColumn
              badges={[]}
              commentsCount={0}
              assignedUsers={[]}
              key={column.id}
              {...column}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeColumn ? (
            <Column {...activeColumn} isDragging />
          ) : activeCard ? (
            <Card {...activeCard} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
