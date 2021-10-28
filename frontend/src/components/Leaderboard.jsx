import React, {useEffect, useContext} from "react";
import "./Leaderboard.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { stateContext } from "../providers/StateProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5D3FD3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Leaderboard() {


    const {state, getScores} = useContext(stateContext);

    useEffect(() => {
        getScores()
      }, []);

    if (!state.scores) return <span>loading..</span>
    const scores = state.scores && state.scores;
    console.log(state);

  return (
    <Container sx={{mt: '6rem'}} className="container" maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Highest Earning</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score) => (
              <StyledTableRow hover key={score.id}>
                <StyledTableCell component="th" scope="row">
                  {score.name}
                </StyledTableCell>
                <StyledTableCell >$ {score.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
