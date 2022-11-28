import Grid from "@mui/material/Grid";
import React from "react";
import Header from "../headerContentList";
import ContentList from "../contentList";
import Pagination from '../pagination';
import Box from '@mui/material/Box';

function ContentListPageTemplate(props) {
  let displayedContent = props.content;
  if (props.contentType === 'tv' || props.contentType === 'person') {
    displayedContent = props.content
      .filter((m) => {
        return m.name.toLowerCase().search(props.context.nameFilter.toLowerCase()) !== -1;
      })
  }
  else if (props.contentType === 'movie') {
    displayedContent = props.content
      .filter((m) => {
        return m.title.toLowerCase().search(props.context.nameFilter.toLowerCase()) !== -1;
      })
  }

  return (
    <div>
    <Header 
    title={props.title}
    context = {props.context}
    setState = {props.setState}
    contentType = {props.contentType}
    />
    <Pagination 
    setState = {props.setState}
    totalPages = {props.totalPages}
    page = {props.page}
    />
    
    <Box sx={{ flexGrow: 1}} >
      <Grid container sx={{ 
      'paddingRight': '20px',
      'paddingLeft': '20px',
      'paddingTop': '15px',
      'paddingBottom': '5px',
      }}
      align="center">
        <Grid item 
        container spacing={2}
        xs={12}
        >
          <ContentList 
          action={props.action} 
          content={displayedContent}
          contentType = {props.contentType}>
          </ContentList>
        </Grid>
      </Grid>
    </Box>
    
    <Pagination
    setState = {props.setState}
    totalPages = {props.totalPages}
    page = {props.page}
    />
    </div>
  );
}
export default ContentListPageTemplate;