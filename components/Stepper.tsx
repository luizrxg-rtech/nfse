'use client';

import {Check, FileText} from 'lucide-react';
import {Step} from "@/types/Stepper";
import {Dispatch, SetStateAction, useRef, useEffect, useState} from "react";

interface StepperProps {
  steps: Step[],
  setCurrentStep(value: number | ((prev: number) => number)): void,
  currentStep: number,
  stepValidation?: Record<number, boolean>
}

export default function Stepper({
  steps,
  setCurrentStep,
  currentStep,
  stepValidation = {}
}: StepperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current && stepRefs.current[currentStep - 1]) {
      const container = containerRef.current;
      const currentStepElement = stepRefs.current[currentStep - 1];
      const stepCircle = currentStepElement?.querySelector('div');

      if (stepCircle) {
        const containerRect = container.getBoundingClientRect();
        const stepRect = stepCircle.getBoundingClientRect();
        const relativePosition = stepRect.left - containerRect.left + (stepRect.width / 2);
        const percentage = (relativePosition / containerRect.width) * 100;
        setProgressWidth(percentage);
      }
    }
  }, [currentStep, steps]);

  return (
    <div ref={containerRef} className="flex items-center justify-between w-full relative mb-2">
      <div className="flex absolute min-w-full h-0.5 bg-gray-200 rounded-full">
        <div
          style={{
            width: progressWidth + "%",
          }}
          className="flex h-0.5 bg-accent transition-all duration-200"
        />
      </div>
      {steps.map((step, index) => (
        <button
          key={index}
          ref={el => stepRefs.current[index] = el}
          onClick={() => {

            // if (
            //   step.id === 1 ||
            //   step.id < currentStep ||
            //   (step.id === currentStep + 1 && stepValidation[currentStep]) ||
            //   (step.id > currentStep + 1 && Array.from({length: step.id - 1}, (_, i) => i + 1).every(id => stepValidation[id]))
            // ) {
              setCurrentStep(step.id);
            // }
          }}
          className={
            `flex items-center bg-background w-fit z-50
              ${index > 0 && 'pl-3'}
              ${step.id > currentStep && !stepValidation[currentStep] ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
          <div
            className={
              `flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full transition-all duration-300 ${
                step.id === currentStep
                  ? 'bg-accent text-white scale-110 font-semibold'
                  : step.id < currentStep
                    ? 'bg-accent text-white font-semibold'
                    : 'bg-gray-200 text-gray-500'
              }`
            }
          >
            {step.id < currentStep ? <Check /> : step.id }
          </div>
          <span
            className={
              `mx-3 whitespace-nowrap text-sm font-semibold ${
                step.id <= currentStep ? 'text-accent' : 'text-gray-500'
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