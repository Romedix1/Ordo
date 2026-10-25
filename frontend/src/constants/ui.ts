export type BadgeColors =
  | "indigo"
  | "amber"
  | "red"
  | "green"
  | "sky"
  | "violet";

export const colorVariants: Record<BadgeColors, string> = {
  indigo: "bg-label-indigo text-label-indigo-foreground",
  amber: "bg-label-amber text-label-amber-foreground",
  red: "bg-label-red text-label-red-foreground",
  green: "bg-label-green text-label-green-foreground",
  sky: "bg-label-sky text-label-sky-foreground",
  violet: "bg-label-violet text-label-violet-foreground",
};
