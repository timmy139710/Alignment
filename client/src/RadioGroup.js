import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    marginLeft: 20,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginTop: 60,
    marginLeft: 20,
  },
  typography: {
    marginLeft: 20,
  }

});

class RadioButtonsGroup extends React.Component {
  state = {
    type: 'DNA',
    algo: 'Smith-Waterman',
    gapcosterror: false,
    gapopencosterror: false,
    gapclosecosterror: false,
  };

  handleChangeType = event => {
    this.setState({ type: event.target.value });
    this.props.setType(event.target.value);
  };

  handleChangeAlgo = event => {
    this.setState({ algo: event.target.value });
    this.props.setAlgo(event.target.value)
  }

  handlechangeGapCost = event => {
    var value = parseFloat(event.target.value);
    var error = false;
    this.props.setGapCost(parseFloat(event.target.value));
    if(value > 10 || value < 1) error = true;
    if(isNaN(event.target.value)) error = true;
    if(event.target.value==='') error = true;
    this.setState({ gapcosterror: (error===true)? true : false, });
  }

  handlechangeGapOpenCost = event => {
    var value = parseFloat(event.target.value);
    var error = false;
    this.props.setGapOpenCost(parseFloat(event.target.value));
    if(value > 10 || value < 1) error = true;
    if(isNaN(event.target.value)) error = true;
    if(event.target.value==='') error = true;
    this.setState({ gapopencosterror: (error===true)? true : false, });
  }

  handlechangeGapCloseCost = event => {
    var value = parseFloat(event.target.value);
    var error = false;
    this.props.setGapCloseCost(parseFloat(event.target.value));
    if(value > 10 || value < 1) error = true;
    if(isNaN(event.target.value)) error = true;
    if(event.target.value==='') error = true;
    this.setState({ gapclosecosterror: (error===true)? true : false, });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Type of Sequence</FormLabel>
          <RadioGroup
            aria-label="type"
            name="gender1"
            className={classes.group}
            value={this.state.type}
            onChange={this.handleChangeType}
          >
            <FormControlLabel value="DNA" control={<Radio />} label="DNA" />
            <FormControlLabel value="RNA" control={<Radio />} label="RNA" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" >Scoring Algorithm</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender2"
            className={classes.group}
            value={this.state.algo}
            onChange={this.handleChangeAlgo}
          >
            <FormControlLabel value="Smith-Waterman"     control={<Radio color="primary" />} label="Smith-Waterman" />
            <FormControlLabel value="Needleman-Wunsch"   control={<Radio color="primary" />} label="Needleman-Wunsch" />
            <FormControlLabel value="Affine gap penalty" control={<Radio color="primary" />} label="Affine gap penalty" />
          </RadioGroup>
          {/* <FormHelperText>You can display an error</FormHelperText>         */}
        </FormControl>
        <FormControl >
            <TextField
            label="Gap cost"
            id="Gap"
            defaultValue="1"
            className={classes.textField}
            helperText="Range: 1~10"
            margin="dense"
            onChange={this.handlechangeGapCost}
            disabled={(this.props.algo==='Affine gap penalty')? true : false}
            error={this.state.gapcosterror}
        />
        <TextField
            label="Gap open cost"
            id="Gap-open"
            defaultValue="1"
            className={classes.textField}
            helperText="Range: 1~10"
            margin="dense"
            onChange={this.handlechangeGapOpenCost}
            disabled={(this.props.algo==='Affine gap penalty')? false : true}
            error={this.state.gapopencosterror}
        />
        <TextField
            label="Gap extend cost"
            id="Gap-extend"
            defaultValue="1"
            className={classes.textField}
            helperText="Range: 1~10"
            margin="dense"
            onChange={this.handlechangeGapCloseCost}
            disabled={(this.props.algo==='Affine gap penalty')? false : true}
            error={this.state.gapclosecosterror}
        />
        </FormControl>
        <FormControl className={classes.formControl}>
            <Typography variant="subheading" gutterBottom align='left'>
                For more information (wiki):
            </Typography>
            <Typography variant="body2" gutterBottom align='left'>
                <Button href="https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm">
                Smith-Waterman
                </Button>            
            </Typography>
            <Typography variant="body2" gutterBottom align='left'>
                <Button href="https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm">
                Needleman-Wunsch
                </Button> 
            </Typography>
            <Typography variant="body2" gutterBottom align='left'>
                <Button href="https://en.wikipedia.org/wiki/Gap_penalty#Affine">
                Affine Gap penalty
                </Button> 
            </Typography>

        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);

