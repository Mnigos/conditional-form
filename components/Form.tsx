import React, { ChangeEvent, FormEvent, useState } from 'react'

import FormElement from './FormElement'

import { InitialFormState } from '~/interfaces/initialFormState'

const initialFormState: InitialFormState = {
  courseType: 'HTML Course',
  levelOfAdvancement: 'Beginner',
  yourSkills: [],
  name: '',
}

export default function Form() {
  const [formValues, setFormValues] = useState(initialFormState)
  const [currentStep, setStep] = useState(1)

  const courseTypeOptions = [
    'HTML Course',
    'CSS Course',
    'JavaScript Course',
    'React Course',
    'Vue Course',
  ]

  const yourSkillsOptions = [
    'Knowledge of HTML',
    'Knowledge of CSS',
    'Advanced JavaScript knowlage',
  ]

  const levelOfAdvancementOptions = ['Beginner', 'Advanced']

  const goToNextStep = () => setStep(step => step + 1)
  const goToBackStep = () => setStep(step => step - 1)

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  function handleYourSkillsChange(value: string[]): void {
    setFormValues({
      ...formValues,
      yourSkills: value,
    })
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  const formElements = [
    {
      title: 'Choose course type',
      name: 'courseType',
      stepNumber: 1,
      value: formValues.courseType,
      options: courseTypeOptions,
      goToNextStep,
    },
    {
      title: 'Level of advancement',
      name: 'levelOfAdvancement',
      stepNumber: 2,
      value: formValues.levelOfAdvancement,
      options: levelOfAdvancementOptions,
      goToNextStep,
      goToBackStep,
    },
    {
      title: 'Your Skills',
      name: 'yourSkills',
      stepNumber: 3,
      checkOnChange: handleYourSkillsChange,
      value: formValues.yourSkills,
      options: yourSkillsOptions,
      checkbox: true,
      goToNextStep,
      goToBackStep,
    },
    {
      title: 'Your Name',
      name: 'name',
      stepNumber: 4,
      value: formValues.name,
      goToNextStep,
      goToBackStep,
    },
  ]

  return (
    <form onSubmit={handleSubmitForm} className="mt-10">
      {formElements.map((element, index) => (
        <FormElement
          key={index}
          show={currentStep === element.stepNumber}
          title={element.title}
          name={element.name}
          stepNumber={element.stepNumber}
          onChange={element.checkOnChange ? undefined : handleSelectChange}
          checkOnChange={element.checkOnChange}
          value={element.value}
          checkbox={element.checkbox}
          options={element.options}
          goToNextStep={element.goToNextStep}
          goToBackStep={element.goToBackStep}
        />
      ))}
    </form>
  )
}
