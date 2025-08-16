"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Pencil, Search, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ComboBox";
import { useState } from "react";
import { getParts } from "@/actions/part.action";
import { Parts as PartModel } from "@/generated/prisma";

type GetPartsResult  = Awaited<ReturnType<typeof getParts>>;

interface PartsTableProps {
  parts: GetPartsResult 
}

export default function TableDemo({ parts }: PartsTableProps) {

  const [category, setCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredParts = parts?.userParts?.filter((part: PartModel) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "" || part.type === category));

  return (
    <div className="flex flex-col rounded-2xl border shadow-sm bg-background p-4">
      <div className="relative flex items-center gap-2 py-4">
        <Input placeholder={"Filter PC Parts..."} className="pl-10" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
        <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        <Combobox value={category} onChange={(val) => setCategory(val)} />
      </div>
      <Table>
        <TableCaption className="text-sm text-muted-foreground">
          A list of PC Parts.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Part</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParts?.map((part: PartModel) => (
            <TableRow key={part.id} className="hover:bg-muted/40 transition-colors">
              <TableCell className="font-medium">{part.name}</TableCell>
              <TableCell className="text-center">{part.type.toLocaleUpperCase()}</TableCell>
              <TableCell className="text-right">${part.amount}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1 cursor-pointer">
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" className="flex items-center gap-1 cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold">
              Total
            </TableCell>
            <TableCell className="text-right font-semibold">
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
