/*eslint-disable*/
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { connect } from 'react-redux'
import classnames from 'classnames'

// react components for routing our app without refresh
import history from 'history.js'
import { Link } from 'react-router-dom'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons'

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx'
import Button from 'components/CustomButtons/Button.jsx'

import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx'

function HeaderLinks({ ...props }) {
  const { classes, user } = props
  console.log(user)
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="ติดตามเราที่ Youtube"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="#"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-youtube'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="#"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
      {user.isSignedIn ? (
        <ListItem className={classes.listItem}>
          <Tooltip
            title="Welcome"
            placement={window.innerWidth > 959 ? 'top' : 'left'}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              className={classes.navLink}
              // style={{ paddingTop: 0, paddingLeft: 15 }}
              onClick={() => history.push('/login')}
            >
              <img
                src={user.imageUrl}
                alt="User images"
                style={{
                  width: '50px',
                  borderRadius: '50% !important',
                  marginRight: '10%',
                }}
              />
              {user.name}
            </Button>
          </Tooltip>
        </ListItem>
      ) : (
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-facebook"
            title="เข้าสู่ระบบกัน!!"
            placement={window.innerWidth > 959 ? 'top' : 'left'}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              className={classes.navLink}
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          </Tooltip>
        </ListItem>
      )}
    </List>
  )
}

export default connect(state => {
  return { user: state.auth }
})(withStyles(headerLinksStyle)(HeaderLinks))
