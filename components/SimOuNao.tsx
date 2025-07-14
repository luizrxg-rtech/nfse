'use client';

import {Label} from "@/components/ui/label";

interface SimOuNaoProps {
  value: string;
  onChange(value: string): void;
  label: string;
}

export default function SimOuNao({
  value,
  onChange,
  label
}: SimOuNaoProps) {

  const values: SimOuNao[] = [
    {buttonValue: "sim", text: "Sim"},
    {buttonValue: "nao", text: "Não"},
  ]

  const handleClick = (value: string) => {
    onChange(value);
  }

  const Button = (
    { buttonValue, text }: SimOuNao
  ) => {
    return (
      <button
        className={`
          text-lg h-[42px] w-full transition-all font-semibold duration-100 z-10
          ${value === buttonValue ? "text-white" : "text-gray-400"}
        `}
        onClick={() => handleClick(buttonValue)}
      >
        {text}
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <Label>
        {label}
      </Label>
      <div className="p-2 bg-background rounded-2xl">
        <div className='flex flex-row bg-background relative'>
          <div
            className={`
              absolute rounded-xl w-1/2 h-full bg-accent transition-all duration-100
              ${value === 'sim' ? "left-0" : "left-1/2"}
            `}
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
    </div>
  )
}