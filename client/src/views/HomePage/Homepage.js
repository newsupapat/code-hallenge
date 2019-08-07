import React, { useEffect,useRef,useState } from 'react'
import classnames from 'classnames'
import axios from 'axios'
// For Router
import history from 'history.js'
// Semantic Css Framework
import { Grid, Segment, Header as HeaderS } from 'semantic-ui-react'

// Components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Card from './section/Card'

// Terminal
import Terminal from 'terminal-in-react'

// Css Custom & Style
import './style/Home.css'
import './style/Home.scss'
import withStyles from '@material-ui/core/styles/withStyles'
import HomepageStyle from './style/Homepage'

import image from 'assets/img/bg7.jpg'
import image2 from 'assets/img/bg7-placeholder.jpg'

const HomePage = props => {
  const { classes, ...rest } = props
  //State
  const [Problem,setProblem] = useState([])

  const showMsg = () => 'Hello World'
  //For Optimize Image Loading
  const asyncth = useRef(null)
  useEffect(() => {
    const item = asyncth.current
    const img = new Image()
    img.src = item.dataset.src
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      return item.nodeName === 'IMG'
        ? (item.src = item.dataset.src)
        : (item.style.backgroundImage = `url(${item.dataset.src})`)
    }
  }, [])
  useEffect(()=>{
    const fetchProblem  = async () => {
      try {
        const response = await axios.get('api/problem')
        if(response.status === 200){
          setProblem(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchProblem()
  },[])
  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='ThCoding'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        ref={asyncth}
        data-src={image}
        style={{
          backgroundImage: 'url(' + image2 + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <HeaderS
                    size='huge'
                    textAlign='center'
                    style={{ fontFamily: `'Press Start 2P', cursive` }}
                  >
                    Welcome To THcodeing
                  </HeaderS>
                  <HeaderS
                    size='small'
                    textAlign='center'
                    style={{ fontFamily: `'Mitr', sans-serif` }}
                  >
                    ยินดีต้อนรับ เข้าสู่โลกใหม่แห่งการโค้ด
                  </HeaderS>
                  <Segment style={{ maxHeight: '30vh', minHeight: '30vh' }}>
                    <Terminal
                      color='green'
                      backgroundColor='black'
                      barColor='black'
                      allowTabs={false}
                      style={{
                        fontSize: '2em',
                        fontFamily: `'Press Start 2P', cursive`,
                        // maxHeight: "100%",
                        height: '27vh',
                        overflowY: 'scroll'
                      }}
                      commands={{
                        'open-google': () =>
                          window.open('https://www.google.com/', '_blank'),
                        showmsg: showMsg,
                        popup: message => alert(message),
                        login: () => history.push('/login')
                      }}
                      descriptions={{
                        'open-google': 'opens google.com',
                        showmsg: 'shows a message',
                        alert: 'alert',
                        popup: 'alert'
                      }}
                      msg='สวัสดี เรียนรู้การโค้ดง่ายๆ ไปด้วยกัน'
                    />
                  </Segment>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid >
            <Grid.Row centered >
              <Grid.Column mobile={16} tablet={8} computer={8} >
                <Card />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Card />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default withStyles(HomepageStyle)(HomePage)
