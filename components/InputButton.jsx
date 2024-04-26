"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { InputZone } from "./InputZone";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(prev) => {
        if (!prev) {
          setIsOpen(prev);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>New Session</Button>
      </DialogTrigger>

      <DialogContent>
        <InputZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
