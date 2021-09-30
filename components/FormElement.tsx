import { DOMAttributes, SelectHTMLAttributes } from 'react'

interface FormElementProps {
  show: boolean
  title: string
  name: string
  stepNumber: number
  onChange: SelectHTMLAttributes<HTMLSelectElement>['onChange']
  value: SelectHTMLAttributes<HTMLSelectElement>['value']
  goToNextStep: DOMAttributes<HTMLButtonElement>['onChange']
  goToBackStep?: DOMAttributes<HTMLButtonElement>['onChange']
  options: string[]
}

export default function FormElement({
  show,
  title,
  name,
  stepNumber,
  options,
  onChange,
  value,
  goToNextStep,
  goToBackStep,
}: FormElementProps) {
  if (!show)
    return (
      <div className="flex justify-start mt-8 w-72">
        <div className="flex items-center justify-center w-10 h-10 text-2xl font-semibold bg-gray-300 rounded-full">
          {stepNumber}
        </div>

        <div className="flex flex-col justify-between mt-1 ml-8">
          <label className="text-xl font-semibold">{title}</label>
        </div>
      </div>
    )

  return (
    <div className="flex justify-start mt-8 w-72">
      <div className="flex items-center justify-center w-10 h-10 text-2xl font-semibold bg-gray-300 rounded-full">
        {stepNumber}
      </div>

      <div className="flex flex-col justify-between mt-1 ml-8 h-28">
        <label className="text-xl font-semibold">{title}</label>

        <select name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>

        <div>
          {!!goToBackStep && (
            <button className="btn" onClick={goToBackStep}>
              Back
            </button>
          )}
          <button className="btn" onClick={goToNextStep}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
