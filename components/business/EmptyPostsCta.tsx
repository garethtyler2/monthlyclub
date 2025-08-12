"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreatePostModal from "@/components/business/CreatePostModal";

export default function EmptyPostsCta({ businessId }: { businessId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <CreatePostModal businessId={businessId} open={open} onOpenChange={setOpen} />
      <Button className="hero-button-primary" onClick={() => setOpen(true)}>
        Create your first post
      </Button>
    </div>
  );
}


