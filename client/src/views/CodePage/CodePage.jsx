import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

//History for Route
import history from 'history.js'

// core components
import Header from 'components/Header/Header.jsx'
import Footer from 'components/Footer/Footer.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import HeaderLinks from 'components/Header/HeaderLinks.jsx'
import Parallax from 'components/Parallax/Parallax.jsx'

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx'

// Sections for this page
import CodePage from './Sections/CardCodeing'


const dashboardRoutes = []
const codeC = `#include <stdio.h>
int main()
{
    int n, i, flag = 0;
    printf("Enter a positive integer: ");
    scanf("%d", &n);
    for(i = 2; i <= n/2; ++i)
    {
        // condition for nonprime number
        if(n%i == 0)
        {
            flag = 1;
            break;
        }
    }
    if (n == 1)
    {
      printf("1 is neither a prime nor a composite number.");
    }
    else
    {
        if (flag == 0)
          printf("%d is a prime number.", n);
        else
          printf("%d is not a prime number.", n);
    }

    return 0;
}`
const codeJS = `console.log('new')`
const problem = {
  codes: { C: { code: codeC }, Javascript: { code: codeJS } },
  inputs: ['1', '2', '3', '4'],
  outputs: ['1', '2', '6', '24']
}
class LandingPage extends React.Component {
  render () {
    console.log(history)
    const { classes, ...rest } = this.props
    return (
      <div >
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
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object
}

export default withStyles(landingPageStyle)(LandingPage)
