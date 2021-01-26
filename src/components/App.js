import React, { Component } from 'react';
import axios from "axios"
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from "./Post/Post.js"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
    .then( posts => {
      // console.log(posts)
      this.setState({
        posts: posts.data
      })
    }).catch( err => {
      console.log("Error getting all posts")
    })
  }

  updatePost(id, text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
  .then( res => {
    this.setState({
      posts: res.data
    })
  })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then( res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, {text})
    .then( res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    console.log(this.state.posts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />

          {this.state.posts.map( elem => (

              <Post 
                key={elem.id}
                id={elem.id} 
                text={elem.text} 
                date={elem.date} 
                updatePostFn={this.updatePost} 
                deletePostFn={this.deletePost}
              />

          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
