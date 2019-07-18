import React, { useState } from 'react'
import Editor from './Editor'
import { Container } from 'semantic-ui-react'
import Axios from 'axios'

const Code = () => {
  const [code, Setcode] = useState('')
  const onchange = value => {
    console.log(value)
    Setcode(value)
  }
  const handleSubmitCode = async () => {
    const res = await Axios.post('/compilecode', { lang: 'c', code, input: 4 })
    console.log(res.data)
  }
  return (
    <Container>
      <Editor onchange={onchange} />
      <button onClick={handleSubmitCode}>Click Here</button>
    </Container>
  )
}

export default Code
