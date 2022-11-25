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
    count={200}
    onChange={(event, pageNum) => props.setState(pageNum)}
    />
    </Paper>
  );
};

export default PaginationFooter;