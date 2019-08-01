import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Email from '@material-ui/icons/Email'
import People from '@material-ui/icons/People'
// core components
import Header from 'components/Header/Header.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { UpdateUser } from 'actions/index'
import { connect } from 'react-redux'

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx'

import image from 'assets/img/bg7.jpg'

class LoginPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor (props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden'
    }
  }
  responseGoogle = response => {
    console.log(response)
    this.props.UpdateUser(response.profileObj)
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
                  <form className={classes.form}>
                    {/* <GoogleLogout
                          clientId="4191382520-7qlq1h1jn3s2bsi8gcdeaah5ked6oadi.apps.googleusercontent.com"
                          buttonText="Logout"
                          onLogoutSuccess={this.responseGoogle}
                        ></GoogleLogout> */}
                    {/* <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader> */}
                    <CardFooter className={classes.cardFooter}>
                      <GoogleLogin
                        clientId='4191382520-7qlq1h1jn3s2bsi8gcdeaah5ked6oadi.apps.googleusercontent.com'
                        buttonText={`Login with Google`}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </CardFooter>
                  </form>
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

LoginPage.propTypes = {
  classes: PropTypes.object
}
const mapStatetoprops = state => {
  return { user: state.auth }
}
export default connect(
  mapStatetoprops,
  { UpdateUser }
)(withStyles(loginPageStyle)(LoginPage))
