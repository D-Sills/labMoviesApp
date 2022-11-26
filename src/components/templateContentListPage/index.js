import Grid from "@mui/material/Grid";
import React from "react";
import Header from "../headerContentList";
import ContentList from "../contentList";
import Pagination from '../pagination';

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
    <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <ContentList 
        action={props.action} 
        content={displayedContent}
        contentType = {props.contentType}>
        </ContentList>
      </Grid>
    </Grid>
    <Pagination
    setState = {props.setState}
    totalPages = {props.totalPages}
    page = {props.page}
    />
    </div>
  );
}
export default ContentListPageTemplate;