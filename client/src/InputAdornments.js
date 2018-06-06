import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
    marginLeft: 20,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const errMsg = {
   DNA: "MUST contain only A,T,C,G symbols",
   RNA: "MUST contain only A,T,C,G,U symbols",
   other: "MUST contain only Alphabets",
}

class InputAdornments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      amount: '',
      bank: '',
      query: '',
      bankerror: false,
      queryerror: false,
    };
    this.parseBankSymbol = this.parseBankSymbol.bind(this);
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value.toUpperCase() });
    var value = event.target.value.toUpperCase();
    if(prop === 'bank'){
      this.props.setBank(event.target.value.toUpperCase());
      this.parseBankSymbol('bank', value);
    }
    else if(prop === 'query'){
      this.props.setQuery(event.target.value.toUpperCase());
      this.parseBankSymbol('query', value);
    }
  };

  parseBankSymbol(type, seq) {
    var error = false;
    console.log(seq);
    for(let i = 0; i < seq.length; ++i){
      switch(this.props.type){
        case "DNA":
            if(seq[i]!=='A'&& seq[i]!=='T' && seq[i]!=='C' && seq[i]!=='G') 
                error = true;
            break;
        case 'RNA':
            if(seq[i]!=='A'&& seq[i]!=='T' && seq[i]!=='C' && seq[i]!=='G' && seq[i]!=='U')
                error = true;
            break;
        case 'other':
            if(!seq.match(/[A-Z]/i)) error = true;
            break;
        default: 
            if(!seq.match(/[A-Z]/i)) error = true;
            break;
            
      }
    }
    console.log(error);
    if(type === 'bank'){
      this.setState({ bankerror: (error===true)? true : false });
      this.props.setBankError(error);
    }
    else{
      this.setState({ queryerror: (error===true)? true : false });
      this.props.setQueryError(error);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl fullWidth className={classes.margin} error={this.props.bankerror}>
          <InputLabel htmlFor="Bank-Sequence">Bank Sequence</InputLabel>
          <Input
            id="Bank-Sequence"
            value={this.state.bank}
            onChange={this.handleChange('bank')}
          />
          <FormHelperText id="weight-helper-text" >{errMsg[this.props.type]}</FormHelperText>
        </FormControl>
        <FormControl fullWidth className={classes.margin} error={this.props.queryerror}>
          <InputLabel htmlFor="Query-Sequence">Query Sequence</InputLabel>
          <Input
            id="Query-Sequence"
            value={this.state.query}
            onChange={this.handleChange('query')}
          />
          <FormHelperText id="weight-helper-text">{errMsg[this.props.type]}</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);
