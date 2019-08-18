import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import classNames from 'classnames'
// core components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { UpdateUser, DestroyUser } from 'actions/index'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading/Loader'

import { AwesomeButton } from 'react-awesome-button'
import 'react-awesome-button/dist/styles.css'
import 'views/CodePage/Sections/code.css'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx'

import image from 'assets/img/bg7.jpg'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      loading: false
    }
  }
  responseGoogle = async response => {
    try {
      // this.setState({ loading: true })
      const res = await axios.post('/user/token', response.profileObj)
      if (res.status !== 400) {
        this.props.UpdateUser({ ...response.profileObj, ...res.data })
        // this.setState({ loading: false })
        Cookies.set('_token', res.data.accessToken, { expires: 1 })
      }
    } catch (error) {
      console.error('Cannot Login')
    } finally {
      // this.setState({ loading: false })
    }
  }
  onLogout = response => {
    console.log(response)
    const auth2 = window.gapi.auth2.getAuthInstance()
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect().then(this.props.onLogoutSuccess))
    }
    this.props.DestroyUser()
  }
  componentDidMount () {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: '' })
      }.bind(this),
      700
    )
  }
  render () {
    const { classes, ...rest } = this.props
    const { loading } = this.state
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    )
    if (loading) {
      return (
        <div className='center'>
          <Loading />
          <style jsx>{`
            .center {
              display: flex;
              align-items: center;
              position: relative;
              background: linear-gradient(
                to bottom right,
                #070630 0%,
                #060454 100%
              );
              min-height: 100vh;
            }
          `}</style>
        </div>
      )
    } else {
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
            style={{
              backgroundImage: 'url(' + image + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            <div className={classes.container}>
              <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[this.state.cardAnimaton]}>
                    {this.props.user.isSignedIn ? (
                      <div className={classes.profile}>
                        <div>
                          <img
                            src={this.props.user.imageUrl}
                            alt='User images'
                            className={imageClasses}
                          />
                          <CardBody
                            style={{
                              transform: 'translate3d(0, -50%, 0)',
                              fontFamily: 'sans-serif'
                            }}
                          >
                            <h3 className={classes.title}>
                              {this.props.user.name}
                            </h3>
                            <br />
                            {this.props.user.role === 'admin' ? (
                              <Link to='/Create'>
                                <AwesomeButton type='link'>
                                  Create New Challenge
                                </AwesomeButton>
                              </Link>
                            ) : null}
                          </CardBody>
                        </div>
                        <CardFooter className={classes.cardFooter}>
                          <GoogleLogout
                            buttonText='Logout'
                            onLogoutSuccess={this.onLogout}
                          />
                        </CardFooter>
                      </div>
                    ) : (
                      <CardFooter className={classes.cardFooter}>
                        <GoogleLogin
                          clientId='4191382520-7qlq1h1jn3s2bsi8gcdeaah5ked6oadi.apps.googleusercontent.com'
                          buttonText={`Login with Google`}
                          onSuccess={this.responseGoogle}
                          onFailure={this.onFailure}
                          cookiePolicy={'single_host_origin'}
                        />
                      </CardFooter>
                    )}
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
            <Footer whiteFont />
          </div>
        </div>
      )
    }
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object
}
const mapStatetoprops = state => {
  return { user: state.auth }
}
export default connect(
  mapStatetoprops,
  { UpdateUser, DestroyUser }
)(withStyles(loginPageStyle)(LoginPage))
