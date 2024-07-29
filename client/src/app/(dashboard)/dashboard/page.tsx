"use client";

import Board from "@/components/dashboard/Board";
import Sheet from "@/components/dashboard/ToggleSheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/redux.hooks";
import { TaskStatus, updateTaskStatus } from "@/redux/slice/taskStatus.slice";
import { openSheet } from "@/redux/slice/toggle.slice";

import {
  Calendar,
  CircleHelp,
  CirclePlus,
  Filter,
  Search,
  Share2,
  Sparkle,
} from "lucide-react";

const data = [
  {
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    img: "",
  },
  {
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    img: "",
  },
  {
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    img: "",
  },
];

const iconData = [
  {
    title: "Calender View",
    icon: <Calendar />,
  },
  {
    title: "Automation",
    icon: <Sparkle />,
  },
  {
    title: "Filter",
    icon: <Filter />,
  },
  {
    title: "Share",
    icon: <Share2 />,
  },
];

const Page = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.name);
  const handleClick = (status: TaskStatus) => {
    dispatch(openSheet());
    dispatch(updateTaskStatus(status));
  };
  return (
    <div className="flex flex-col px-4 py-6 h-screen bg-[#F7F7F7]">
      {/* greeting */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">
          Good Morning, {username || "John"}!
        </h1>
        <div className="flex items-center gap-2">
          Help & feedback
          <CircleHelp />
        </div>
      </div>

      {/* card */}
      <div className="flex items-center gap-4 my-4">
        {data.map((item) => (
          <Card key={item.title} className="">
            <div className="flex items-center ">
              <CardContent className="p-1">
                <img src="/share.jpg" alt={item.title} className="w-[300px]" />
              </CardContent>
              <CardHeader className="p-1 space-y-0">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}
      </div>

      {/* icon */}
      <div className="flex items-center justify-between my-2 ">
        <div className="border rounded-md flex items-center justify-between p-1 bg-white">
          <input
            placeholder="Search"
            className="bg-transparent border-0 focus:outline-none focus:ring-0"
          />
          <Search className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-8 ">
          {iconData.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 text-[#797979] cursor-pointer bg-[#F4F4F4] p-2 rounded-md"
            >
              {item.icon}
              <span className="text-md">{item.title}</span>
            </div>
          ))}
          <button
            className="flex items-center justify-center gap-1 p-2 rounded-md bg-button-gradient text-white"
            onClick={() => handleClick(TaskStatus.ToDo)}
          >
            Create new <CirclePlus />
          </button>
        </div>
      </div>

      {/* task board */}
      <div className="bg-white overflow-auto h-full w-full rounded-md mt-2">
        <Board />
      </div>
      <Sheet />
    </div>
  );
};

export default Page;
