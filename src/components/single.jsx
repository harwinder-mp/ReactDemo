import React, { Component } from "react";
import axios from "axios";
class SinglePost extends Component {
  state = {
    post: []
  };

  async componentDidMount() {
    try {
      const apiUrl = "https://jsonplaceholder.typicode.com/";
      const postUrl = this.props.match.path;
      const pathName = this.props.location.pathname;
      const postId = pathName.replace(postUrl, "");
      const { data: post } = await axios.get(apiUrl + "posts/" + postId);
      this.setState({ post });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { post } = this.state;
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-1">
            <h4>{post.id}</h4>
          </div>
          <div className="col">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePost;
