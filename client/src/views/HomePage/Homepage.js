import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// For Router
import history from 'history.js'
// Semantic Css Framework
import { Grid, Segment, Header as HeaderS, Loader } from 'semantic-ui-react'

// Components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Card from './section/Card'

// Actions Redux
import { fetchProblem } from 'actions'

// Terminal
import Terminal from 'terminal-in-react'

// Css Custom & Style
import './style/Home.css'
import './style/Home.scss'
import withStyles from '@material-ui/core/styles/withStyles'
import HomepageStyle from './style/Homepage'

import image from 'assets/img/bg7.jpg'
import image2 from 'assets/img/bg7-placeholder.jpg'

import LazyLoad from 'react-lazyload'

const HomePage = props => {
  const { fetchProblem, Problems, classes, ...rest } = props

  const showMsg = () => 'Hello World'

  // For Optimize Image Loading
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
  useEffect(() => {
    fetchProblem()
  }, [])
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
          <Grid>
            <Grid.Row centered>
              {Problems.map((problem, i) => (
                <Grid.Column mobile={16} tablet={8} computer={8} key={i}>
                  <LazyLoad
                    once
                    height={200}
                    // offset={[-100, 0]}
                    // debounce={200}
                    placeholder={
                      <Segment
                        inverted
                        style={{ height: 200, marginBottom: '25%' }}
                      >
                        <Loader active inverted />
                      </Segment>
                    }
                  >
                    <Card problem={problem} />
                  </LazyLoad>
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return { Problems: Object.values(state.Problem) }
  },
  { fetchProblem }
)(withStyles(HomepageStyle)(HomePage))
