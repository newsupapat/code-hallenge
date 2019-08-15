import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { fetchProblembyid } from 'actions'
import queryString from 'query-string'
// History for Route
import history from 'history.js'

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'
import Loading from 'components/Loading/Loader'


import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx'

// Sections for this page
import CodePage from './Sections/CardCodeing'

const dashboardRoutes = []
class LandingPage extends React.Component {
  componentDidMount () {
    const { problem, location, fetchProblembyid } = this.props
    if (!problem) {
      const params = new URLSearchParams(location.search)
      const CodeId = params.get('CodeId')
      fetchProblembyid(CodeId)
    }
  }
  render () {
    const { problem, classes, ...rest } = this.props
    if (problem) {
      return (
        <div>
          <Header
            color='transparent'
            routes={dashboardRoutes}
            brand='TH Codeing'
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 200,
              color: 'white'
            }}
            {...rest}
          />
          <Parallax small filter image={require('assets/img/bg7.jpg')}>
            <div className={classes.container}>
              <GridContainer style={{ marginTop: '6vh' }}>
                <GridItem xs={12} sm={12} md={7}>
                  <h1 className={classes.title}>Welcome to Coding Th</h1>
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <CodePage problem={problem} />
          </div>
          <Footer />
        </div>
      )
    } else {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            background:
              'linear-gradient(to bottom right, #070630 0%, #060454 100%)',
            minHeight: '100vh'
          }}
        >
          <Loading />
        </div>
      )
    }
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object
}
const mapStatetoProp = (state, props) => {
  const values = queryString.parse(props.location.search)
  return { problem: state.Problem[values.CodeId] }
}
export default connect(
  mapStatetoProp,
  { fetchProblembyid }
)(withStyles(landingPageStyle)(LandingPage))
