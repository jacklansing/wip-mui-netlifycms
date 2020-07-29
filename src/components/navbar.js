import React, { useState } from "react"
import { Link } from "gatsby"

import NavBarDrawer from "./navbar-drawer"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    display: "none",
    paddingTop: "5px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textTransform: "uppercase",
  },
  classicNav: {
    listStyle: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    flexFlow: "row no-wrap",
    justifyContent: "space-around",
    "& a": {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: 3,
        left: 0,
        width: "100%",
        borderBottom: "2px solid white",
        opacity: 0,
        transition: "all 1s ease-in-out",
      },
    },
    "& a:hover": {
      "&:after": {
        opacity: 1,
      },
    },
    "& li": {
      position: "relative",
      padding: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  activeLink: {
    "&:after": {
      opacity: "1 !important",
    },
  },
}))

function NavBar({ siteTitle }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const classes = useStyles()

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const isPartiallyActive = ({ isPartiallyCurrent, location }) => {
    const { pathname } = location
    return isPartiallyCurrent &&
      (/\/\d*[^a-z]/.test(pathname) || pathname === "/")
      ? { className: classes.activeLink }
      : {}
  }

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: classes.activeLink } : {}
  }

  const ExactNavLink = props => {
    return <Link getProps={isActive} {...props} />
  }

  const classicNav = () => (
    <nav>
      <Typography component="ul" className={classes.classicNav}>
        <li>
          <Link to="/" getProps={isPartiallyActive}>
            Home
          </Link>
        </li>
        <li>
          <ExactNavLink to="/about">About</ExactNavLink>
        </li>
      </Typography>
    </nav>
  )

  return (
    <div className={classes.root}>
      <NavBarDrawer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <AppBar position="static" style={{ color: "white" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {siteTitle}
          </Typography>
          {classicNav()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
