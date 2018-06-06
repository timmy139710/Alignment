import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { Typography } from '@material-ui/core';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  button: {
    marginTop: 5,
    marginLeft: 20,
  },
});


class ComputeButton extends React.Component {
  state = {
    type: 'DNA',
    algo: 'Smith-Waterman'
  };
  compute = e => {
    e.preventDefault();
    this.props.compute();
    // alert('click!');
  }
  showResult = e =>{
    e.preventDefault();
    this.props.showResult();
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.compute}
              disabled={(this.props.computedisable || this.props.bankerror || this.props.queryerror)}
            >
            Compute Score
            </Button>
        </FormControl>
        <FormControl>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.showResult}
              disabled={this.props.computedone? false : true}
            >
            Show Result
            </Button>
        </FormControl>
      </div>
    );
  }
}

ComputeButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComputeButton);

