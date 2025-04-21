// src/components/SavedItemCard.tsx
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Props {
    title: string;
    description?: string;
    onDelete: () => void;
    injuryId?: string; // ✅ Add this
  }
  

const SavedItemCard: React.FC<Props> = ({ title, description, onDelete, injuryId }) => (
<div className="border rounded-xl overflow-hidden animate-fade-in border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent p-4 flex flex-col min-w-[200px] relative">
  <div className="flex justify-between items-start gap-2 mb-1">
    <div className="font-semibold text-md text-white">
      {title}
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:bg-red-100"
      aria-label="Delete item"
      onClick={onDelete}
    >
      <Trash className="w-4 h-4" />
    </Button>
  </div>

  {description && (
    <div className="text-gray-500 text-sm mb-3">{description}</div>
  )}

  <Button
    size="sm"
    variant="outline"
    className="mt-auto self-start"
    onClick={() => {
      if (injuryId) {
        window.location.href = `/injury-detail?id=${injuryId}`;
      }
    }}
  >
    View item
  </Button>
</div>

);

export default SavedItemCard;
