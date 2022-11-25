import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";

function PaginationFooter(props) {
  return (
    <Paper 
      sx={{
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1.5,
      }}
      >
    <Pagination 
    count={props.totalPages}
    onChange={(event, pageNum) => props.setState(pageNum)}
    page = {props.page}
    />
    </Paper>
  );
};

export default PaginationFooter;