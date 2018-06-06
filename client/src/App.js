import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import OutlinedButtons from './OutlinedButtons.js';
import RadioGroup from './RadioGroup.js';
// import TextFields from './TextFields.js';
import InputAdornments from './InputAdornments.js';
import ComputeButton from './ComputeButton.js';
import SimpleTable from './tables.js';
import BackButton from './BackButton.js';
import SimpleAppBar from './AppBar.js';
// import { Typography } from '@material-ui/core';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'DNA',
      algo: 'Smith-Waterman',
      bank: '',
      query: '',
      bank_arr: [],
      query_arr: [],
      h_matrix: [],
      t_matrix: [],
      gapcost: 1,
      gapopencost: 1,
      gapclosecost: 1,
      showresult: false,
      computedone: false,
      computedisable: true,
      bankerror: false,
      queryerror: false,
    }

    this.initMatrix = this.initMatrix.bind(this);
    this.compute = this.compute.bind(this);
    this.computeSmith = this.computeSmith.bind(this);
    this.computeNeedleman = this.computeNeedleman.bind(this);
    this.computeAffine = this.computeAffine.bind(this);
    this.match = this.match.bind(this);
    this.Max = this.Max.bind(this);
    this.showResult = this.showResult.bind(this);
    this.back = this.back.bind(this);
    this.checkEnable = this.checkEnable.bind(this);
    document.title='Sequence Alignment'
  }
  setBankError = error => {
    this.setState({ bankerror: error });
  }
  setQueryError = error => {
    this.setState({ queryerror: error });
  }
  setType = type => {
    this.setState({ type: type });
  }
  setAlgo = algo => {
    this.setState({ algo: algo });
  }
  setGapCost = cost => { this.setState({ gapcost: cost }); }
  setGapOpenCost = cost => { this.setState({ gapopencost: cost }); }
  setGapCloseCost = cost => { this.setState({ gapclosecost: cost }); }
  setBank = bank => {
    this.setState({ bank: bank });
    var newbank_arr = [];
    for(let i = 0; i < bank.length; i++)
      newbank_arr.push(bank[i]);
    this.setState({ bank_arr: newbank_arr});
    this.setState({ computedone: false });
    var query = this.state.query;
    this.checkEnable(bank,query);
  }
  setQuery = query => {
    var newh_matrix = [];
    for(let i = 0; i < query.length; ++i)
      newh_matrix[i] = [];
    this.setState({ query: query , h_matrix: newh_matrix});

    var newquery_arr = [];
    for(let i = 0; i < query.length; i++)
      newquery_arr.push(query[i]);
    this.setState({ query_arr: newquery_arr}); 
    this.setState({ computedone: false });
    var bank = this.state.bank;
    this.checkEnable(bank,query);
  }
  initMatrix() {
    var newh_matrix = [];
    var newt_matrix = [];
    var bankseq = this.state.bank;
    var queryseq = this.state.query;

    for(let i = 0; i <= queryseq.length; i++){
      newh_matrix[i] = [];
      newt_matrix[i] = [];
    }
    
    for(let i = 0; i <= queryseq.length; i++){
      for(let j = 0; j <= bankseq.length; j++){
        newh_matrix[i][j] = 0;
        newt_matrix[i][j] = 0;
      }
    }
    console.log('hi')
    console.log('');
    if(this.state.algo === 'Smith-Waterman')
      this.computeSmith(newh_matrix, newt_matrix);
    else if(this.state.algo === 'Needleman-Wunsch')
      this.computeNeedleman(newh_matrix, newt_matrix);
    else 
      this.computeAffine(newh_matrix, newt_matrix);
  }
  computeSmith(newh_matrix, newt_matrix) {
    var query_arr = this.state.query_arr;
    var bank_arr = this.state.bank_arr;
    var g = this.state.gapcost;

    console.log(newh_matrix);

    // border condition initialization
    for(let i = 0; i <= query_arr.length; i++)
      { newh_matrix[i][0] = 0; newt_matrix[i][0] = 0; }
    for(let j = 0; j <= bank_arr.length; j++)
      { newh_matrix[0][j] = 0; newt_matrix[0][j] = 0; }
    
    for(let i = 1; i <= query_arr.length; ++i){
      for(let j = 1; j <= bank_arr.length; ++j){
        [newh_matrix[i][j], newt_matrix[i][j]] = this.Max(newh_matrix[i-1][j-1]+this.match(query_arr[i-1], bank_arr[j-1]), newh_matrix[i-1][j] - g, newh_matrix[i][j-1] - g, 0);
      }
    }
    this.setState({h_matrix: newh_matrix, t_matrix: newt_matrix});
  }
  Max(diag, up, left, d=Number.NEGATIVE_INFINITY) {
    var max = Math.max(diag, up, left, d);

    if(max === diag) return [max, 'DIAG'];
    else if(max === up) return [max, 'UP'];
    else if(max === left) return [max, 'LEFT'];
    else return [d, '0'];
  }
  match(symbolA, symbolB) {
    return (symbolA === symbolB)? 1 : -1;
  }
  computeNeedleman(newh_matrix, newt_matrix) {
    var query_arr = this.state.query_arr;
    var bank_arr = this.state.bank_arr;
    var g = this.state.gapcost;

    console.log(newh_matrix);

    // border condition initialization
    for(let i = 0; i <= query_arr.length; i++)
      { newh_matrix[i][0] = i*-1; newt_matrix[i][0] = 0; }
    for(let j = 0; j <= bank_arr.length; j++)
      { newh_matrix[0][j] = j*-1; newt_matrix[0][j] = 0; }
    
    for(let i = 1; i <= query_arr.length; ++i){
      for(let j = 1; j <= bank_arr.length; ++j){
        [newh_matrix[i][j], newt_matrix[i][j]] = this.Max(newh_matrix[i-1][j-1]+this.match(query_arr[i-1], bank_arr[j-1]), newh_matrix[i-1][j] - g, newh_matrix[i][j-1] - g);
      }
    }

    this.setState({h_matrix: newh_matrix, t_matrix: newt_matrix});
    
  }
  computeAffine(newh_matrix, newt_matrix){
    var query_arr = this.state.query_arr;
    var bank_arr = this.state.bank_arr;
    var g = this.state.gapcost;

    console.log(newh_matrix);

    // border condition initialization
    for(let i = 0; i <= query_arr.length; i++)
      { newh_matrix[i][0] = 0; newt_matrix[i][0] = 0; }
    for(let j = 0; j <= bank_arr.length; j++)
      { newh_matrix[0][j] = 0; newt_matrix[0][j] = 0; }
    
    for(let i = 1; i <= query_arr.length; ++i){
      for(let j = 1; j <= bank_arr.length; ++j){
        [newh_matrix[i][j], newt_matrix[i][j]] = this.Max(newh_matrix[i-1][j-1]+this.match(query_arr[i-1], bank_arr[j-1]), newh_matrix[i-1][j] - g, newh_matrix[i][j-1] - g, 0);
      }
    }
    this.setState({h_matrix: newh_matrix, t_matrix: newt_matrix});
  }
  checkEnable(bank=this.state.bank,query=this.state.query){
    var enable = false;
    if(bank.length>0 && query.length>0) enable=true;
    this.setState({ computedisable: enable? false : true});
  }
  compute() {
    console.log('compute');
    this.initMatrix();
    this.setState({ computedone : true })
  }
  showResult() {
    this.setState({ showresult : true });
  }
  back(){
    this.setState({ showresult: false });
  }
  parseBankSymbol(type, seq) {
    var error = false;
    console.log(seq);
    for(let i = 0; i < seq.length; ++i){
      switch(this.state.type){
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
    }
    else{
      this.setState({ queryerror: (error===true)? true : false });
    }
  }


  render() {
    return (
      <div className="App">
        <div className={(this.state.showresult===false)? 'show': 'hide'}>
          <SimpleAppBar />
          <InputAdornments setBank={this.setBank}  
            setQuery={this.setQuery} 
            type={this.state.type}
            setBankError={this.setBankError}
            setQueryError={this.setQueryError}
            bankerror={this.state.bankerror}
            queryerror={this.state.queryerror}
          />
          <RadioGroup setType={this.setType} setAlgo={this.setAlgo}
          type={this.state.type}
          algo={this.state.algo}
          setGapCost={this.setGapCost}
          setGapOpenCost={this.setGapOpenCost}
          setGapCloseCost={this.setGapCloseCost}
          />
          <ComputeButton 
            compute={this.compute}
            showResult={this.showResult} 
            computedone={this.state.computedone}
            computedisable={this.state.computedisable}
            bankerror={this.state.bankerror}
            queryerror={this.state.queryerror}
          />
        </div>
        <div className={(this.state.showresult===true)? 'show': 'hide'}>
          <SimpleTable
            bank_arr={this.state.bank_arr}
            query_arr={this.state.query_arr}
            h_matrix={this.state.h_matrix}
            t_matrix={this.state.t_matrix}
          />
          <BackButton back={this.back}
            computedone={this.state.computedone}
          />
        </div>
      </div>
    );
  }
}

export default App;
