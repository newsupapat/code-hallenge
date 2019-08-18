import React, { useState, useEffect, useRef } from 'react'
import Editor from 'components/Code/CodeEditor.js'
import ScrollLock from 'react-scroll-lock-component'
import ReactScrollify from 'react-scrollify'
import { UpdateCode } from 'actions'
import {
  Grid,
  Segment,
  Placeholder,
  Button,
  Dropdown,
  Icon,
  Header
} from 'semantic-ui-react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'

import { connect } from 'react-redux'
import Instru from './instruction'

import './code.css'

const MySwal = withReactContent(Swal)

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
  const { codes, inputs, outputs, description } = props.problem
  // const refContainer = useRef(null);
  const ref = []
  const [loading, setloading] = useState(inputs.map(() => false))
  const [valid, setvalid] = useState(inputs.map(() => false))
  const [output, setoutput] = useState(
    'Use Run test Button to Run This Command ->>>>>'
  )
  const [lang, uselang] = useState(Object.keys(codes)[0])
  const onselectlang = (e, { value }) => {
    uselang(value)
  }
  useEffect(() => {
    props.UpdateCode(codes[lang].code)
  }, [])
  useEffect(() => {
    testdata(valid)
  }, [valid])
  useEffect(
    () => {
      props.UpdateCode(codes[lang].code)
    },
    [lang]
  )
  const showDataModel = index => {
    MySwal.fire({
      title: `โจทย์ ข้อ ${index + 1}`,
      html: (
        <Grid stackable columns={1}>
          <Grid.Column>
            <Header as='h2' icon='terminal' content='Input' />
            <Segment style={{ fontFamily: `'Press Start 2P', cursive` }}>
              {inputs[index]}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' icon='file code' content='Output' />
            <Segment style={{ fontFamily: `'Press Start 2P', cursive` }}>
              {outputs[index]}
            </Segment>
          </Grid.Column>
        </Grid>
      ),
      confirmButtonColor: '#03A696',
      confirmButtonText: 'เข้าใจแล้ว'
    })
  }
  const handleSubmitio = async (input, outputscheck, index, next) => {
    try {
      let newloading = loading.slice()
      newloading[index] = true
      setloading(newloading)
      const res = await axios.post('/api/compilecode', {
        lang: lang,
        code: props.code,
        input: input
      })
      console.log(res.data)
      if (res.data.stderr) {
        setoutput(`เจอ Error ที่:${res.data.error} `)
        next(false, 'Error นะคร้าบบ')
        let newvalid = valid.slice()
        newvalid[index] = false
        setvalid(newvalid)
      } else if (
        res.data.stdout &&
        res.data.stdout.replace(/\s+/, '') !== outputscheck
      ) {
        setoutput(`Output is:${res.data.stdout} ต้องการ ${outputscheck}`)
        next(false, 'ใกล้แล้ว')
        let newvalid = valid.slice()
        newvalid[index] = false
        setvalid(newvalid)
      } else if (res.data.stdout.replace(/\s+/, '') === outputscheck) {
        setoutput(`You Pass it`)
        let newvalid = valid.slice()
        newvalid[index] = true
        setvalid(newvalid)
        next()
      }
    } catch (e) {
      console.error(e)
      next(false, 'Error Message :(')
    } finally {
      let newloading = loading.slice()
      newloading[index] = false
      setloading(newloading)
    }
  }
  const renderTestButton = () => {
    return inputs.map((input, i) => {
      return (
        <Button.Group style={{ paddingBottom: '1vw' }} key={i}>
          <AwesomeButtonProgress
            loadingLabel={'กำลังตรวจสอบ...'}
            resultLabel={'Done!'}
            size={'large'}
            type={valid[i] ? 'whatsapp' : 'secondary'}
            action={(element, next) => {
              handleSubmitio(input, outputs[i], i, next)
            }}
            ref={reference => (ref[i] = reference)}
            style={{
              paddingRight: '5px',
              width: '100%',
              fontFamily: 'sans-serif'
            }}
          >
            {valid[i] ? 'ผ่านแล้ว' : `input ${i + 1}`}
          </AwesomeButtonProgress>
          <AwesomeButton
            size='icon'
            type='primary'
            ripple
            onPress={() => showDataModel(i)}
          >
            <Icon name='align justify' />
          </AwesomeButton>
        </Button.Group>
      )
    })
  }
  const postinsql = ref => {
    ref.action()
  }
  const testdata = valid =>{
    console.log(valid)
    console.log(valid.every(lod => lod))
    if(valid.every(lod => lod)){
      MySwal.fire({
          type: 'success',
          title: 'You Pass it',
          text: 'Congratulations',
          footer: '<a href>Why do I have this issue?</a>'
        })
    }
  }
  const Runall = ref => {
    // ref.map(r=>{setTimeout(function(){ r.action(); }, 300);})
    ref[0].action()
    setTimeout(postinsql.bind(null, ref[1]), 2000)
    setTimeout(postinsql.bind(null, ref[2]), 3500)
    setTimeout(postinsql.bind(null, ref[3]), 4800)
  }

  return (
    <Grid columns={3} divided='vertically'>
      <Grid.Row style={{ padding: '1vw' }} stretched>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={5}
          style={{ padding: '0 0.5rem' }}
        >
          <Segment
            raised
            inverted
            style={{
              padding: 40,
              overflowX: 'scroll',
              minHeight: '100%',
              marginBottom: '1%'
            }}
          >
            <Instru des={description} input={inputs} output={outputs} />
          </Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={8}
          style={{ padding: '0 0.5rem' }}
        >
          <Segment inverted style={{ margin: 0 }}>
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

          <Segment style={{ margin: '1% 0' }} raised inverted>
            <ScrollLock>
              <Editor code={codes[lang].code} lang={lang} />
            </ScrollLock>
          </Segment>
          <Segment
            mobile={16}
            tablet={16}
            computer={8}
            inverted
            style={{ marginTop: '1%', fontFamily: `'Mitr', sans-serif` }}
          >
            {loading.every(lod => !lod) ? (
              <pre>{JSON.stringify(output, 0, 2)}</pre>
            ) : (
              <Placeholder inverted>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={3}
          style={{ padding: '0 0.5rem' }}
        >
          <Segment
            raised
            inverted
            style={{ display: 'flex', flexDirection: 'column' }}
            className='centerbutton'
          >
            {renderTestButton()}
          </Segment>
          <Segment raised inverted>
            <Button
              onClick={
                () => Runall(ref)
              }
              icon='play'
              content='Run All'
            />
          </Segment>
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
