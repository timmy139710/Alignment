import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(symbol) {
  id += 1;
  return { id, symbol };
}

function createHead(symbol) {
  id += 1;
  return { id, symbol };
}

class SimpleTable extends React.Component{
  

  render() {
  const { classes } = this.props;
  var head = [];
  for(let i = 0; i < this.props.bank_arr.length; ++i){
    head.push(createHead(this.props.bank_arr[i]));
  }

  var data = [];
  for(let i = 0; i < this.props.query_arr.length; ++i)
    data[i] = {sid: i, content: []};

  for(let i = 0; i < this.props.query_arr.length; ++i){
    data[i].content.push(createHead(this.props.query_arr[i]));
    for(let j = 0; j < this.props.bank_arr.length; ++j){
        data[i].content.push(createData(this.props.h_matrix[i][j]));
    }
  }
  console.log(head);
  console.log(data);

  return (
        <Paper className={classes.root}>
        
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Query Sequence \ Bank Sequence</TableCell>
                {head.map(n => {
                  return (
                    <TableCell key={n.id} >{n.symbol}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return(  
                <TableRow key={n.sid}>
                    {n.content.map(k => {
                      return (
                        <TableCell component="th" scope="row" key={k.id} >{k.symbol}</TableCell>
                      );
                    })}
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );          
  }
}

// function SimpleTable(props) {
//   const { classes } = props;
//   createHead(this.props.bank_arr);
//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Sequence</TableCell>
//             <TableCell numeric>Calories</TableCell>
//             <TableCell numeric>Fat (g)</TableCell>
//             <TableCell numeric>Carbs (g)</TableCell>
//             <TableCell numeric>Protein (g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map(n => {
//             return (
//               <TableRow key={n.id}>
//                 <TableCell component="th" scope="row">
//                   {n.name}
//                 </TableCell>
//                 <TableCell numeric>{n.calories}</TableCell>
//                 <TableCell numeric>{n.fat}</TableCell>
//                 <TableCell numeric>{n.carbs}</TableCell>
//                 <TableCell numeric>{n.protein}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
