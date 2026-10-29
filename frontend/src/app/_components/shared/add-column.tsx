"use client";

import { Button, Input } from "@/app/_components/ui";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddColumn = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="w-72.5 flex flex-col gap-2">
      {isEditing ? (
        <>
          <Input placeholder="Column name" />

          <div className="flex gap-2">
            <Button>Add</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          className="p-3 border border-dashed border-border-dashed w-fill"
        >
          <Plus className="w-5 h-5" /> Add card
        </Button>
      )}
    </section>
  );
};
