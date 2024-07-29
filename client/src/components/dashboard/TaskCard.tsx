import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Trash2 } from "lucide-react";
import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  badge: string;
  date: string;
  time: string;
  status: string;
  onDelete: () => void;
  onEdit: () => void;
}

const getBadgeColor = (badge: string) => {
  switch (badge.toLowerCase()) {
    case "urgent":
      return "bg-[#FF6B6B]";
    case "medium":
      return "bg-[#FFA235]";
    case "low":
      return "bg-[#0ECC5A]";
    default:
      return "bg-gray-200";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  badge,
  date,
  time,
  status,
  onDelete,
  onEdit,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Card onClick={handleEdit}>
          <CardHeader className="pb-2">
            <CardTitle className="text-[#606060] text-lg font-medium">
              {title}
            </CardTitle>
            <CardDescription className="text-[#797979]">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Badge className={`w-fit ${getBadgeColor(badge)}`}>{badge}</Badge>
            <span className="flex items-center gap-1 text-[#606060]">
              <Clock />
              {date}
            </span>
            <span className="text-[#797979] flex items-center justify-between">
              {time}
              <Trash2 className="cursor-pointer" onClick={handleDelete} />
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCard;
