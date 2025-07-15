'use client';

import {Label} from "@/components/ui/label";
import {Option} from "@/types/Option";

interface RadioOptionsProps {
  value: string;
  values: Option[];
  onChange(value: string): void;
  label: string;
}

export default function RadioOptions({
  value,
  values,
  onChange,
  label
}: RadioOptionsProps) {

  const handleClick = (value: string) => {
    onChange(value);
  }

  const Button = (
    { buttonValue, text }: Option
  ) => {
    return (
      <button
        className={`
          text-md h-[42px] w-full transition-all font-semibold duration-100 z-10
          ${value === buttonValue ? "text-white" : "text-gray-400"}
        `}
        onClick={() => handleClick(buttonValue)}
      >
        {text}
      </button>
    )
  }

  const selectedValueIndex = values.indexOf(values.find((i) => i.buttonValue === value)!!)

  return (
    <div className="flex flex-col items-start gap-2">
      <Label>
        {label}
      </Label>
      <div className='flex flex-row w-full bg-background relative rounded-xl overflow-hidden'>
        <div
          style={{
            width: `calc(100% / ${values.length})`,
            left: `calc((100% / ${values.length}) * ${selectedValueIndex})`,
          }}
          className="absolute h-full bg-accent transition-all duration-100 rounded-xl"
        />
        {values.map((item, index) =>
          <Button
            key={index}
            buttonValue={item.buttonValue}
            text={item.text}
          />
        )}
      </div>
    </div>
  )
}