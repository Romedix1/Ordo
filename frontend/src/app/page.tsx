import { Column } from "@/app/_components/shared/column";

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
        { title: "Backend", color: "indigo" },
        { title: "DevOps", color: "amber" },
      ],
      commentsCount: 2,
      assignedUsers: [mockUsers[0]],
    },
    {
      id: "card-2",
      title: "Create responsive dashboard layout",
      badges: [{ title: "Frontend", color: "sky" }],
      commentsCount: 5,
      assignedUsers: [mockUsers[0], mockUsers[1]],
    },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <Column title="To Do" cards={mockCards} />
      <Column title="To Do" />
      <Column title="To Do" cardOn={true} />
      <Column title="To Do" cards={mockCards} cardOn={true} />
    </div>
  );
}
