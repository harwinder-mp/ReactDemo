import React, { Component, useState } from "react";
import { paginate } from "./../utils/paginate";
import Pagination from "./common/pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Modal, Form, ListGroup } from "react-bootstrap";

// import DataTable from "./dataTable";

function ModelAddNew(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} onHide={handleClose} {...props} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Detail</Form.Label>
              <Form.Control type="text" placeholder="Enter Detail" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class ListItms extends Component {
  state = {
    posts: [],
    postSearch: [],
    searchText: "",
    pageSize: 10,
    currentPage: 1,
    users: [],
    curUser: 0,
    userPosts: []
  };
  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const { data: users } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.setState({ posts, users });
    //console.log(users);
  }
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // search
  /*
  searchUpdate = debounce(() => {
    if (this.state.searchText.length > 0) {
      // this.doSearch(this.state.searchText);
    } else {
      // this.setState({ postSearch: this.state.posts });
    }
  }, 500);


  */

  onSearchStart = e => {
    this.setState({ searchText: e.target.value });
    this.setState({ currentPage: 1 });
    this.setState({ curUser: 0 });
  };

  // end search

  // remove
  handleRemovePost = post => {
    // console.log(post);
    const posts = this.state.posts.filter(pos => pos.id !== post);
    this.setState({ posts });
    // console.log(posts);
  };
  // end remove

  // handleUser
  handleUser = u => {
    // console.log(u);
    this.setState({ curUser: u });
    this.setState({ searchText: "" });
    this.setState({ currentPage: 1 });
  };
  // end handleUser

  render() {
    const {
      users,
      posts,
      currentPage,
      pageSize,
      searchText,
      curUser
    } = this.state;
    // const postuser = posts.filter(post => post.userId === 2);
    // console.log(postuser);

    const userBlank = [{ key: "key1", id: 0, name: "All Users" }];

    const allUsers = [...userBlank, ...users];

    const postSearch = posts.filter(post => {
      return post.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });

    const userFilter =
      curUser > 0 ? posts.filter(post => post.userId === curUser) : posts;

    // const userFilter = postSearch.length > 0 ? postSearch : posts;

    const searchFilter = this.state.curUser !== 0 ? userFilter : postSearch;

    const pageitems = paginate(searchFilter, currentPage, pageSize);

    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-sm-2">
            <h2>Users</h2>
            <ListGroup>
              {allUsers.map(user => (
                <ListGroup.Item
                  key={user.id}
                  onClick={this.handleUser.bind(this, user.id)}
                  className={user.id === curUser ? "active" : ""}
                >
                  {user.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="col-sm">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <h2>Posts</h2>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group search-posts">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search"
                    onChange={this.onSearchStart}
                    value={this.state.searchText}
                  />
                </div>
              </div>
              <div className="col-1 text-right" style={{ minWidth: "130px" }}>
                {/* <Button variant="success">Add New</Button> */}
                <ModelAddNew />
              </div>
            </div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Link</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {pageitems.map(post => (
                  <tr key={post.id}>
                    <td>
                      {post.id < 10 ? "0" : ""}
                      {post.id}
                    </td>
                    <td>
                      {users.map(user => user.id === post.userId && user.name)}
                    </td>
                    <td>
                      {users.map(user => user.id === post.userId && user.email)}
                    </td>
                    <td>
                      <b>{post.title}</b>
                    </td>
                    <td>{post.body.substring(0, 60)}...</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Link
                        style={{ width: "100px" }}
                        className="btn btn-sm btn-primary"
                        to={"post/" + post.id}
                      >
                        Read More
                      </Link>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={this.handleRemovePost.bind(this, post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!pageitems.length && (
                  <tr>
                    <td colSpan="7">No Record</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination
              itemsCount={searchFilter.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        {/* <DataTable /> */}
      </div>
    );
  }
}

export default ListItms;
