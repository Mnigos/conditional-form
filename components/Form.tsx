import React, { ChangeEvent, useState } from 'react'

import { InitialFormState } from '~/interfaces/initialFormState'

const initialFormState: InitialFormState = { courseType: undefined }

export default function Form() {
  const [formValues, setFormValues] = useState(initialFormState)

  function handleCourseTypeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form className="flex items-center w-64 justify-evenly">
      <div className="flex items-center justify-center w-10 h-10 text-2xl font-semibold bg-gray-300 rounded-full">
        1
      </div>
      <div className="flex flex-col h-32 justify-evenly">
        <label className="text-xl font-semibold">Choose course type</label>

        <select
          className="border-2 border-gray-300 border-opacity-75 rounded-md cursor-pointer focus:outline-none focus:border-gray-400 hover:border-gray-400"
          name="courseType"
          value={formValues.courseType}
          onChange={handleCourseTypeChange}
        >
          <option value="HTML Course">HTML Course</option>
          <option value="CSS Course">CSS Course</option>
          <option value="JavaScript Course">JavaScript Course</option>
          <option value="React Course">React Course</option>
          <option value="Vue Course">Vue Course</option>
        </select>

        <div>
          <button className="btn">Next</button>
        </div>
      </div>
    </form>
  )
}
