import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

class DataTable extends Component {
  state = {
    posts: [],
    postSearch: [],
    searchText: "",
    pageSize: 10,
    currentPage: 1,
    id: 0
  };
  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
  }
  render() {
    const data = {
      columns: [
        {
          label: "User",
          field: "userid",
          sort: "asc",
          width: 150
        },
        {
          label: "ID",
          field: "id",
          sort: "asc",
          width: 270
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
          width: 200
        },
        {
          label: "Detail",
          field: "detail",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.state.posts
    };
    return <MDBDataTable striped bordered hover data={data} />;
  }
}

export default DataTable;
