'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {InputProps} from "@/components/ui/input";
import {LabelProps} from "@/components/ui/label";
import {ChangeEvent, ComponentProps, useState, FocusEvent} from "react";
import {cn} from "@/lib/utils";

interface ValidatedInputProps {
  id: string,
  label: string,
  placeholder?: string,
  type?: string,
  value: string,
  onChange?(e: ChangeEvent<HTMLInputElement>): void,
  required?: boolean,
  inputProps?: InputProps,
  labelProps?: LabelProps,
  className?: string,
  error?: string,
  readOnly?: boolean,
}

export default function ValidatedInput({
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
  error,
  readOnly = false,
} : ValidatedInputProps) {
  const [touched, setTouched] = useState(false);
  const hasValue = value && value.length > 0;
  const hasError = touched && error && error.length > 0;
  
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (inputProps?.onBlur) {
      inputProps.onBlur(e);
    }
  };

  return (
    <div className={cn(className, "flex flex-col relative")}>
      <div className="relative">
        <Input
          {...inputProps}
          id={id}
          className={cn(
            inputProps?.className, 
            "peer box-border pt-7 h-18 placeholder:text-transparent focus:placeholder:text-gray-200",
            hasError ? "border-red-500 focus:border-red-500" : "",
            readOnly ? "bg-gray-50" : ""
          )}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          type={type}
          readOnly={readOnly}
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
            "peer-focus:left-4 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-accent",
            hasError ? "text-red-500 peer-focus:text-red-500" : ""
          )}
        >
          {label} {' '}
          {required && <span className="text-orange-500">*</span>}
        </Label>
      </div>
      {hasError && (
        <p className="text-red-500 text-sm absolute -bottom-5">{error}</p>
      )}
    </div>
  );
}