'use client';

import {Check, FileText} from 'lucide-react';
import {Step} from "@/types/Stepper";
import {Dispatch, SetStateAction} from "react";

export default function Stepper({
  steps,
  setCurrentStep,
  currentStep
}: {
  steps: Step[],
  setCurrentStep: Dispatch<SetStateAction<number>>,
  currentStep: number
}) {
  return (
    <div className="flex items-center justify-between w-full relative mb-2">
      <div className="flex min-w-full h-px bg-gray-300 absolute">
        {/*<div*/}
        {/*  style={{*/}
        {/*    width: ((100 / steps.length) * (currentStep - 1)) + "%",*/}
        {/*  }}*/}
        {/*  className="flex h-px bg-gradient-to-br from-primary-200 to-primary-300 transition-all duration-200"*/}
        {/*/>*/}
      </div>
      {steps.map((step, index) => (
        <button
          key={index}
          onClick={() => setCurrentStep(step.id)}
          className={
            `flex items-center bg-gray-100 w-fit z-50
              ${index > 0 && 'pl-3'}
            `}
        >
          <div
            className={
              `flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full transition-all duration-300 ${
                step.id === currentStep
                  ? 'bg-gradient text-white scale-110 font-semibold'
                  : step.id < currentStep
                    ? 'bg-gradient text-white font-semibold'
                    : 'bg-gray-200 text-gray-500'
              }`
            }
          >
            {step.id < currentStep ? <Check /> : step.id }
          </div>
          <span
            className={
              `mx-3 whitespace-nowrap text-sm font-semibold ${
                step.id === currentStep ? 'text-gradient' : 'text-gray-500'
              }`
            }
          >
              {step.title}
            </span>
        </button>
      ))}
    </div>
  );
}