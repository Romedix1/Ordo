"use client";

import { Card, Column } from "@/app/_components/shared";
import { SortableColumn } from "@/app/_components/shared/sortable-column";
import { Logo } from "@/app/_components/ui/logo";
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
  return (
    <div className="flex items-start pt-48 flex-1  justify-center bg-zinc-50 dark:bg-black  gap-4">
      <Logo />
    </div>
  );
}
