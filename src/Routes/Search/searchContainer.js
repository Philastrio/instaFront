import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./searchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./searchQueries";

export default withRouter(({ location: { search } }) => {
  const searchTerm = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH);
  return (
    <SearchPresenter searchTerm={searchTerm} loading={loading} data={data} />
  );
});
