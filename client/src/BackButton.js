import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  button: {
    marginTop: 50,
    marginLeft: 20,
  },
});


class BackButton extends React.Component {
  state = {
    type: 'DNA',
    algo: 'Smith-Waterman'
  };
  back = e => {
    e.preventDefault();
    this.props.back();
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.back}
            >
            Back
            </Button>
        </FormControl>
      </div>
    );
  }
}

BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackButton);

