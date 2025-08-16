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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDemo() {

  const [category, setCategory] = useState<string>('');

  return (
    <div className="flex flex-col rounded-2xl border shadow-sm bg-background p-4">
      <div className="relative flex items-center gap-2 py-4">
        <Input placeholder={"Filter PC Parts"} className="pl-10"/>
        <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2"/>
        <Combobox value={category} onChange={(val) => setCategory(val)}/>
      </div>
      <Table>
        <TableCaption className="text-sm text-muted-foreground">
          A list of PC Parts.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Part</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-right">Brand</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              className="hover:bg-muted/40 transition-colors"
            >
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell className="text-center">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right">{invoice.brand}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
