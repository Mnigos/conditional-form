import React, { ChangeEvent, FormEvent, useState } from 'react'

import FormElement from './FormElement'

import { InitialFormState } from '~/interfaces/initialFormState'

const initialFormState: InitialFormState = {
  courseType: 'HTML Course',
  levelOfAdvancement: 'Beginner',
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

  const levelOfAdvancementOptions = ['Beginner', 'Advanced']

  const goToNextStep = () => setStep(step => step + 1)
  const goToBackStep = () => setStep(step => step - 1)

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <FormElement
        show={currentStep === 1}
        title="Choose course type"
        name="courseType"
        stepNumber={1}
        onChange={handleSelectChange}
        value={formValues.courseType}
        goToNextStep={goToNextStep}
        options={courseTypeOptions}
      />

      <FormElement
        show={currentStep === 2}
        title="Level of advancement"
        name="levelOfAdvancement"
        stepNumber={2}
        onChange={handleSelectChange}
        value={formValues.levelOfAdvancement}
        goToNextStep={goToNextStep}
        goToBackStep={goToBackStep}
        options={levelOfAdvancementOptions}
      />

      <FormElement
        show={currentStep === 3}
        title="Your Name"
        name="name"
        stepNumber={3}
        onChange={handleSelectChange}
        value={formValues.name}
        goToNextStep={goToNextStep}
        goToBackStep={goToBackStep}
      />
    </form>
  )
}
