import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import WarningIcon from '@material-ui/icons/Warning';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: "10px",
      margin: "15px",
    },
    container: {
      maxHeight: 440,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    anomaly: {
      color: "#ff6961",
    }
  });


export default function DataTable(props){
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('');
    const [filter, setFilter] = React.useState(false);
    const [rows, setRows] = React.useState(props.rows);

    React.useEffect(() => {
      setRows(props.rows)
    }, [props.rows])

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    function filterArray(array) {
      const filteredArray = array.filter(item => item.Anomaly === true );
      return filteredArray;
    }

    const toggleFilter = () => {
      setFilter(!filter);
      !filter ? setRows(filterArray(props.rows)) : setRows(props.rows)
    }
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
        <Paper className={classes.root} variant="outlined">
          <h2 style={{textAlign: 'left'}}>
          {props.header}
          {!props.removeFilter && <Tooltip title={!filter ? "Only Anomalies" : "All Findings"}>
            <IconButton id="table-filter" aria-label="only anomalies" onClick={e => {toggleFilter()}}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          }
          </h2>

          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <TableSortLabel
                        className="sort-label"
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={ e => {handleRequestSort(e, column.id)}}>
                      {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell className = {row.Anomaly ? classes.anomaly : ''} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    {row.Anomaly ? <NavLink to={"/alerts/"+row.key}><IconButton aria-label="View Anomaly"><WarningIcon className={classes.anomaly}></WarningIcon></IconButton></NavLink> : ''}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{ display:"flex" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      );

}

  
  