import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { getReviews } from "../../api/tmdb-api.js";
import { excerpt } from "../../util";

export default function MovieReviews(props) {
  const type = props.type;
  const content = props.content;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(type, content.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <Box>
    {
      reviews.length === 0 ? ( 
      <Typography variant="body1">
        We don't have any reviews for {type === 'movie' ? content.title : content.name}. Would you like to write one?
      </Typography>
      ) : 
    
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell >{excerpt(r.content)}</TableCell>
              <TableCell >
      
                  Full Review
  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
  </Box>
  );
}