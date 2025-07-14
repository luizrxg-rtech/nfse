'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {InputProps} from "@/components/ui/input";
import {LabelProps} from "@/components/ui/label";
import {ChangeEvent, ComponentProps} from "react";
import {cn} from "@/lib/utils";

interface LabeledInputProps {
  id: string,
  label: string,
  placeholder?: string,
  type?: string,
  value: string,
  onChange(e: ChangeEvent<HTMLInputElement>): void,
  required?: boolean,
  inputProps?: InputProps,
  labelProps?: LabelProps,
  className?: string,
}

export default function LabeledInput({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  required = false,
  inputProps,
  labelProps,
  className,
} : LabeledInputProps) {
  const hasValue = value && value.length > 0;

  return (
    <div className={cn(className, "flex flex-col relative")}>
      <Input
        {...inputProps}
        id={id}
        className={cn(inputProps?.className, "peer box-border pt-7 h-18 placeholder:text-transparent focus:placeholder:text-gray-200")}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <Label
        {...labelProps}
        htmlFor={id}
        style={{
          lineHeight: 1,
        }}
        className={cn(
          "absolute transition-all duration-200 pointer-events-none pl-[2px] pt-0.5",
          hasValue ? "left-4 top-2.5 text-sm text-gray-400" : "top-6 left-4 text-gray-400",
          "peer-focus:left-4 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-accent"
        )}
      >
        {label} {' '}
        {required && <span className="text-orange-500">*</span>}
      </Label>
    </div>
  );
}