"use client";

import { Separator } from "@/components/ui/separator";
import { Sheet as ExternalSheet, SheetContent } from "@/components/ui/sheet";

import { useAppDispatch, useAppSelector } from "@/redux/redux.hooks";
import { closeSheet } from "@/redux/slice/toggle.slice";
import { Minimize2, Share2, Star, X } from "lucide-react";
import InputField from "./InputField";
import { clearSelectedTask } from "@/redux/slice/task.slice";

const Sheet = () => {
  const dispatch = useAppDispatch();
  const isToggled = useAppSelector((state) => state.toggle.isSheetOpen);
  const selectedTask = useAppSelector((state) => state.task.selectedTask);

  const handleClose = () => {
    dispatch(closeSheet());
    dispatch(clearSelectedTask());
  };
  return (
    <ExternalSheet open={isToggled} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-[1200px]"
        style={{ maxWidth: "50vw" }}
      >
        <div className="flex flex-col">
          {/* icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <X onClick={handleClose} className="cursor-pointer" />
              <Minimize2 />
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 bg-[#F4F4F4] text-[#797979] p-2 rounded-md">
                Share <Share2 />
              </button>
              <button className="flex items-center gap-2 bg-[#F4F4F4] text-[#797979] p-2 rounded-md">
                Favorite <Star />
              </button>
            </div>
          </div>

          {/* content */}
          <div className="my-4">
            <InputField task={selectedTask} />
          </div>

          <Separator className="my-4" />

          <span className="my-6 text-[#666666]">
            Start writing, or drag your own files here.
          </span>
        </div>
      </SheetContent>
    </ExternalSheet>
  );
};

export default Sheet;
