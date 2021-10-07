import { FormState } from '~/interfaces'

export const initialFormValues = () =>
  ({
    courseType: 'HTML Course',
    levelOfAdvancement: 'Beginner',
    yourSkills: [],
    name: '',
  } as FormState)
