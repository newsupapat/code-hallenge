import React, { useState, useEffect } from 'react'
import Editor from 'components/Code/CodeEditor.js'
import ScrollLock from 'react-scroll-lock-component'
import ReactScrollify from 'react-scrollify'
import { UpdateCode } from 'actions'
import {
  Grid,
  Segment,
  Placeholder,
  Button,
  Icon,
  Dropdown
} from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import Instru from './instruction'

const languageOptions = [
  {
    key: 'Javascript',
    text: 'Javascript',
    value: 'Javascript',
    image: {
      avatar: true,
      src:
        'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_960_720.png'
    }
  },
  {
    key: 'C',
    text: 'C',
    value: 'C',
    image: {
      avatar: true,
      src: 'https://png.icons8.com/color/1600/c-programming'
    }
  },
  {
    key: 'Python',
    text: 'Python',
    value: 'Python',
    image: {
      avatar: true,
      src:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png'
    }
  }
]

const Coding = props => {
  const { codes, inputs, outputs } = props.problem
  const [loading, setloading] = useState(false)
  const [output, setoutput] = useState(
    'Use Run test Button to Run This Command ->>>>>'
  )
  const [lang, uselang] = useState(Object.keys(codes)[0])
  console.log(lang)
  const handleSubmitio = async (input, outputscheck) => {
    try {
      setloading(true)
      const res = await axios.post('/compilecode', {
        lang: lang,
        code: props.code,
        input: input
      })
      console.log(res.data)
      setoutput(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setloading(false)
    }
  }
  const onselectlang = (e, { value }) => {
    uselang(value)
  }
  useEffect(() => {
    props.UpdateCode(codes[lang].code)
  }, [])
  useEffect(
    () => {
      props.UpdateCode(codes[lang].code)
    },
    [lang]
  )
  const renderTestButton = () => {
    return inputs.map((input, i) => {
      return (
        <Button.Group style={{ paddingBottom: '1vw' }} key={i}>
          <Button
            primary
            onClick={() => {
              handleSubmitio(input, outputs[i])
            }}
          >{`Test ${i + 1} `}</Button>
          <Button icon>
            <Icon name='align justify' />
          </Button>
        </Button.Group>
      )
    })
  }
  return (
    <Grid columns={3} divided>
      <Grid.Row style={{ padding: '1vw' }}>
        <Grid.Column mobile={16} tablet={6} computer={6}>
          <Segment raised inverted style={{ padding: 40 }}>
            <Instru />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment inverted>
            <Dropdown
              placeholder='Select Language'
              defaultValue={lang}
              fluid
              selection
              button
              options={languageOptions}
              onChange={onselectlang}
            />
          </Segment>

          <Segment style={{ padding: '1vw 0' }} raised inverted>
            <ScrollLock>
              <Editor code={codes[lang].code} lang={lang} />
            </ScrollLock>
          </Segment>
          <Segment mobile={16} tablet={8} computer={8} inverted>
            {!loading ? (
              <h3>{JSON.stringify(output)}</h3>
            ) : (
              <Placeholder inverted>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={2} computer={2}>
          <ScrollLock>
            <Segment raised inverted>
              {renderTestButton()}
            </Segment>
          </ScrollLock>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const mapStateToprops = state => {
  return { code: state.code }
}
export default connect(
  mapStateToprops,
  { UpdateCode }
)(Coding)
