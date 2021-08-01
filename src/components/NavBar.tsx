import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import './NavBar.scss'
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    minWidth: '600px'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tooltip: {
    fontSize: '1em',
    letterSpacing: '0.1em'
  }
}));

export const NavBar = ():ReactElement => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<any>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-navbar';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId}
          keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Home page</MenuItem>
      <MenuItem onClick={handleMenuClose}>About</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-navbar-mobile';
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId}
          keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='Home'>
          <Link to='/'>
            <HomeIcon />
            <h5>Home</h5>
          </Link>
        </IconButton>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label='About'>
          <Link to='/about'>
            <InfoIcon />
            <h5>About</h5>
          </Link>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div id='main-nav-bar' className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            N Queens
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton aria-label='Home'>
              <Link to='/'>
                <Tooltip title='Home' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <HomeIcon />
                </Tooltip>
              </Link>
            </IconButton>
            <IconButton aria-label='About'>
              <Link to='/about'>
                <Tooltip title='About' placement='bottom' classes={{tooltip: classes.tooltip}}>
                  <InfoIcon />
                </Tooltip>
              </Link>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="Show more" aria-controls={mobileMenuId} aria-haspopup="true"
                        onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
