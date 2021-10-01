/* eslint-disable unicorn/no-nested-ternary */
import { ChangeEvent, SelectHTMLAttributes } from 'react'

type OnChange = SelectHTMLAttributes<
  HTMLSelectElement | HTMLInputElement
>['onChange']
interface FormElementProps {
  show: boolean
  title: string
  name: string
  stepNumber: number
  onChange?: OnChange
  checkOnChange?: (value: string[]) => void
  value:
    | SelectHTMLAttributes<HTMLSelectElement | HTMLInputElement>['value']
    | string[]
  goToNextStep: () => void
  goToBackStep?: () => void
  options?: string[]
  checkbox?: boolean
}

export default function FormElement({
  show,
  title,
  name,
  stepNumber,
  options,
  onChange,
  checkOnChange,
  value,
  goToNextStep,
  goToBackStep,
  checkbox,
}: FormElementProps) {
  function handleCheckBoxChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) (value as string[]).push(event.target.value)
    else value = (value as string[]).filter(el => el !== event.target.value)

    if (value && checkOnChange) checkOnChange(value as string[])
  }

  if (!show)
    return (
      <div className="flex justify-start h-16 mt-2 w-96">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 text-2xl font-semibold bg-gray-300 rounded-full">
            {stepNumber}
          </div>
          <div className="w-0.5 h-1/6 mt-3 bg-gray-300"></div>
        </div>

        <div className="flex flex-col justify-between mt-1 ml-8">
          <label className="text-xl font-semibold">{title}</label>
        </div>
      </div>
    )

  return (
    <div className="flex justify-start h-40 mt-2 w-96">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 text-2xl font-semibold bg-gray-300 rounded-full">
          {stepNumber}
        </div>
        <div className="w-0.5 h-2/3 mt-3 bg-gray-300"></div>
      </div>

      <div className="flex flex-col justify-between h-full mt-1 ml-8">
        <label className="text-xl font-semibold">{title}</label>

        {options && !checkbox ? (
          <select name={name} value={value} onChange={onChange as OnChange}>
            {options?.map((option, index) => (
              <option value={option} key={index} className="cursor-pointer">
                {option}
              </option>
            ))}
          </select>
        ) : checkbox ? (
          <>
            {options?.map((option, index) => (
              <span key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-6 h-4"
                  value={option}
                  onChange={handleCheckBoxChange}
                />
                <label>{option}</label>
              </span>
            ))}
          </>
        ) : (
          <input
            value={value}
            name={name}
            onChange={onChange}
            placeholder={title}
          />
        )}

        <div>
          {!!goToBackStep && (
            <button className="mr-4 btn" onClick={goToBackStep}>
              Back
            </button>
          )}
          <button
            className={
              checkbox
                ? value?.toString() === options?.toString()
                  ? 'btn'
                  : 'btn-disabled cursor-not-allowed'
                : value
                ? 'btn'
                : 'btn-disabled cursor-not-allowed'
            }
            disabled={
              checkbox
                ? (value as string[])?.sort().toString() !==
                  options?.sort().toString()
                : !value
            }
            onClick={goToNextStep}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
