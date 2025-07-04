import React from "react";

export interface Step {
  id: number,
  component: React.FC<StepComponentProps>,
  title: string,
  active: boolean
}

export interface StepComponentProps {
  formData: any,
  handleInputChange: (field: string, value: string) => void,
  className: string
}