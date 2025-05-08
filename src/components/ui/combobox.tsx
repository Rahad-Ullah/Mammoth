"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

interface ComboboxOption {
  label: string;
  value: string | undefined;
}

interface ComboboxProps {
  name: string;
  options: ComboboxOption[];
  defaultValue?: string | undefined;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Combobox({
  name,
  options,
  defaultValue,
  onValueChange,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // reset state when default value is undefined
  React.useEffect(() => {
    if (defaultValue === undefined) {
      setValue("");
    }
  }, [defaultValue]);

  // Track if the component has mounted
  const hasMounted = React.useRef(false);

  // Pass the value to callback only after the component has mounted
  React.useEffect(() => {
    if (hasMounted.current) {
      if (onValueChange) onValueChange(value);
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between ${className}`}
        >
          {defaultValue
            ? options.find((option) => option.value === defaultValue)?.label
            : value
            ? options.find((option) => option.value === value)?.label
            : `${name}`}
          <ChevronDown className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${name.toLowerCase()}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No {name?.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {capitalizeSentence(option.label)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
