import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PcCase } from "lucide-react";
import AddProductForm from "./AddProductForm";
import { useState } from "react";
export default function AddDialog() {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="ml-auto">
        <Button variant="outline" className="flex flex-row items-center justify-center">
          <PcCase className="w-4 h-4" />
          <h1>Add PC Part</h1>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a product</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            Fill in all the fields to post a new pc part.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AddProductForm closeDialog={() => setOpen(false)}/>
      </AlertDialogContent>
    </AlertDialog>
  );
}