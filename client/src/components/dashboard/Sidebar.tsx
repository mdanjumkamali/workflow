"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowDownToLine,
  BellDot,
  ChartLine,
  ChevronsRight,
  CirclePlus,
  House,
  Loader,
  Settings,
  SquareKanban,
  Users,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/redux.hooks";
import { openSheet } from "@/redux/slice/toggle.slice";
import { logout } from "@/redux/slice/auth.slice";
import { TaskStatus, updateTaskStatus } from "@/redux/slice/taskStatus.slice";

const link = [
  {
    name: "Home",
    icon: <House />,
  },
  {
    name: "Boards",
    icon: <SquareKanban />,
  },
  {
    name: "Settings",
    icon: <Settings />,
  },
  {
    name: "Teams",
    icon: <Users />,
  },
  {
    name: "Analytics",
    icon: <ChartLine />,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.name);

  const handleClick = (status: TaskStatus) => {
    dispatch(openSheet());
    dispatch(updateTaskStatus(status));
  };

  const logOut = () => {
    dispatch(logout());
    window.location.replace("/login");
  };

  return (
    <div className="flex flex-col justify-between px-4 py-6 h-screen">
      <div>
        {/* profile */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{username || "John"}</h1>
        </div>

        {/* icon */}
        <div className="flex items-center justify-between my-6">
          <div className="flex items-center gap-2">
            <BellDot />
            <Loader />
            <ChevronsRight />
          </div>
          <button
            className="bg-[#F4F4F4] px-3 py-2 rounded-md text-[#797979]"
            onClick={logOut}
          >
            Logout
          </button>
        </div>

        {/* link */}
        <div>
          {link.map((item, index) => (
            <div
              key={index}
              className={
                item.name === "Home"
                  ? "bg-[#F4F4F4] p-2 rounded-md flex items-center gap-6 my-2 cursor-pointer"
                  : "flex items-center gap-6 my-2 p-2 hover:bg-[#F4F4F4] hover:rounded-md cursor-pointer"
              }
            >
              {item.icon}
              <h1>{item.name}</h1>
            </div>
          ))}
        </div>

        {/* button */}
        <div className="py-3">
          <button
            className="flex items-center justify-center gap-1 py-3 rounded-md bg-button-gradient text-white w-full"
            onClick={() => handleClick(TaskStatus.ToDo)}
          >
            Create new task <CirclePlus />
          </button>
        </div>
      </div>

      {/* download button */}

      <div className="bg-[#F3F3F3] flex items-center gap-4 px-2 py-1 rounded-md cursor-pointer">
        <ArrowDownToLine />
        <div className="flex flex-col">
          <span className="text-lg">Download the app</span>
          <span className="text-sm">Get the full experience </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
