"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const parts = [
  {value: 'all',label: 'All'},
  {value: 'cpu',label: 'CPU'},
  {value: 'cpu cooler',label: 'CPU Cooler'},
  {value: 'motherboard',label: 'Motherboard'},
  {value: 'memory',label: 'Motherboard'},
  {value: 'storage',label: 'Storage'},
  {value: 'gpu',label: 'GPU'},
  {value: 'power supply',label: 'Power Supply'},
  {value: 'cases',label: 'Cases'},
]

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? parts.find((part) => part.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {parts.map((part) => (
                <CommandItem
                  key={part.value}
                  value={part.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  {part.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === part.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
