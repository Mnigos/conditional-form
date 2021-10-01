import React, { ChangeEvent, FormEvent, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import FormElement from './FormElement'

import { InitialFormState } from '~/interfaces/initialFormState'

const HTMLCourse = 'HTML Course'
const ReactCourse = 'React Course'
const VueCourse = 'Vue Course'
const HTMLKnowledge = 'Knowledge of HTML'

const initialFormState: InitialFormState = {
  courseType: HTMLCourse,
  levelOfAdvancement: 'Beginner',
  yourSkills: [],
  name: '',
}

export default function Form() {
  const [formValues, setFormValues] = useState(initialFormState)
  const [currentStep, setStep] = useState(1)

  const courseTypeOptions = [
    HTMLCourse,
    'CSS Course',
    'JavaScript Course',
    ReactCourse,
    VueCourse,
  ]

  const levelOfAdvancementOptions = [ReactCourse, VueCourse].includes(
    formValues.courseType
  )
    ? ['Beginner', 'Intermediate', 'Advanced']
    : ['Beginner', 'Advanced']

  const yourSkillsOptions = (() => {
    if ([ReactCourse, VueCourse].includes(formValues.courseType))
      return [HTMLKnowledge, 'Knowledge of CSS', 'Advanced JavaScript knowlage']

    if (formValues.courseType === 'JavaScript Course')
      return ['Intermediate', 'Advanced'].includes(
        formValues.levelOfAdvancement
      )
        ? [HTMLKnowledge, 'Knowledge of CSS']
        : [HTMLKnowledge]

    if (formValues.courseType === 'CSS Course') return [HTMLKnowledge]
  })()

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
      show: () => false,
      value: formValues.courseType,
      options: courseTypeOptions,
      goToNextStep,
    },
    {
      title: 'Level of advancement',
      name: 'levelOfAdvancement',
      show: () => formValues.courseType === HTMLCourse,
      value: formValues.levelOfAdvancement,
      options: levelOfAdvancementOptions,
      goToNextStep,
      goToBackStep,
    },
    {
      title: 'Your Skills',
      name: 'yourSkills',
      show: () => !yourSkillsOptions,
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
      show: () => false,
      value: formValues.name,
      goToNextStep,
      goToBackStep,
    },
  ]
  let stepNumber = 0

  return (
    <form
      onSubmit={handleSubmitForm}
      className="mt-10 duration-300 ease-in-out trasition-all"
    >
      {formElements.map((element, i) => {
        console.log(stepNumber)
        if (!element.show()) ++stepNumber
        return (
          <CSSTransition
            in={!element.show()}
            timeout={550}
            classNames="form"
            unmountOnExit
            key={i}
          >
            <FormElement
              stepNumber={stepNumber}
              show={currentStep === stepNumber}
              title={element.title}
              name={element.name}
              onChange={element.checkOnChange ? undefined : handleSelectChange}
              checkOnChange={element.checkOnChange}
              value={element.value}
              checkbox={element.checkbox}
              options={element.options}
              goToNextStep={element.goToNextStep}
              goToBackStep={element.goToBackStep}
            />
          </CSSTransition>
        )
      })}
    </form>
  )
}
