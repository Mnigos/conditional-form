import { createContext, FC, useState } from 'react'

import { FormState } from '~/interfaces'

interface FormContext {
  formValues: FormState
  updateFormValues(formValues: FormState): void
}

const initialFormValues: FormState = {
  courseType: 'HTML Course',
  levelOfAdvancement: 'Beginner',
  yourSkills: [],
  name: '',
}

export const FormContext = createContext<FormContext>({
  formValues: initialFormValues,
  updateFormValues() {
    throw new Error('Cannot find updateFormValues function definition')
  },
})

const FormProvider: FC = ({ children }) => {
  const [formValues, updateFormValues] = useState(initialFormValues)

  return (
    <FormContext.Provider
      value={{
        formValues,
        updateFormValues,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
