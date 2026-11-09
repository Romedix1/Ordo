"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "./input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "endAdornment"
>;

export const PasswordInput = (props: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <Button
          type="button"
          variant="ghost"
          className="h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent duration-200"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff className="w-4.5 h-4.5" />
          ) : (
            <Eye className="w-4.5 h-4.5" />
          )}
        </Button>
      }
    />
  );
};
