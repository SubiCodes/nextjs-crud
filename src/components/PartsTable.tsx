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
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ComboBox";
import { useState } from "react";
import { getParts } from "@/actions/part.action";
import { Parts as PartModel } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { getCurrentUserId } from "@/actions/user.actions";
import { SignIn } from "@stackframe/stack";

type GetPartsResult = Awaited<ReturnType<typeof getParts>>;

interface PartsTableProps {
  parts: GetPartsResult
  user: any
}

export default function TableDemo({ parts, user }: PartsTableProps) {
  const router = useRouter();

  if (!user) {
    return (
      <div className='flex flex-1 min-h-screen pb-24 items-center justify-center'>
        <SignIn />
      </div>
    )
  }

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
          {filteredParts?.map((part: PartModel) => {
            const slugifiedName = part.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${part.id}--${slugifiedName}`;
            const partUrl = `/parts/${slug}`;

            return (
              <TableRow key={part.id} className="hover:bg-muted/40 transition-colors" onClick={() => router.push(partUrl)}>
                <TableCell className="font-medium">{part.name}</TableCell>
                <TableCell className="text-center">{part.type.toLocaleUpperCase()}</TableCell>
                <TableCell className="text-right">${part.amount}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  {user === part.userId ? (
                    <>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 cursor-pointer">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" className="flex items-center gap-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="destructive" className="flex items-center gap-1 cursor-pointer">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  )}

                </TableCell>
              </TableRow>
            )
          })}
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
