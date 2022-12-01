import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useQuery } from 'react-query';
import { getReviews } from "../../api/tmdb-api.js";
import { excerpt } from "../../util";
import MovieReview from "./movieReview";

export default function MovieReviews(props) {
  const type = props.type;
  const content = props.content;
  const [openFullReview, setOpenFullReview] = useState();
  const [review, setReview] = useState();
  
  const { data, error, isLoading, isError }  = useQuery({
    queryKey: ["reviews", type, content.id],
    queryFn: () => getReviews(type, content.id),
    keepPreviousData : true
  });
  
  if (isLoading) {
      return
  }
  
  if (isError) {
      return <h1>{error.message}</h1>
  }  
  
  let reviews = data.results;
  
  const OpenReview = (r) => {
    setReview(r);
    setOpenFullReview(true);
  }
  
  const CloseReview = () => {
    setOpenFullReview(false);
  }
  
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
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                <b>{r.author}</b>
              </TableCell>
              <TableCell >{excerpt(r.content)}</TableCell>
              <TableCell >
                  <Button size = "small" onClick={() => OpenReview(r)} startIcon={<SearchIcon />} variant="outlined">
                  Full Review
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    
    <MovieReview open={openFullReview} close={CloseReview} review={review}/>
  </Box>
  );
}