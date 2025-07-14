import {FC} from "react";

export interface Step {
  id: number,
  component: FC<StepComponentProps>,
  title: string,
  active: boolean
}

export interface StepComponentProps {
  formData: any,
  handleInputChange(field: string, value: string): void,
  className: string
}