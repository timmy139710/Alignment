import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 3,
    marginLeft: 0,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Sequence Alignment Tool
          </Typography>
        </Toolbar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
