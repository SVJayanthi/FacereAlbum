import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// CSS configuration
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

// Title bar that lists name
export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="black" style={{ background: 'grey' }}>
        <Toolbar>
          <Typography variant="h2" className={classes.title} style={{color: props.color}}>
              Facere Album
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}