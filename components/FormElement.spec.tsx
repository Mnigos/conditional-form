import { render } from 'enzyme'
import React from 'react'

import FormElement from './FormElement'

describe('FormElement Component', () => {
  it('Renders Component', () => {
    render(
      <FormElement
        show={true}
        title="Test FormElement"
        name="testFormElement"
        stepNumber={1}
        value={['']}
        goToNextStep={() => {}}
        onChange={() => {}}
      />
    )
  })
})
