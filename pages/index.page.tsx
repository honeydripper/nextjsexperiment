import React, { Component, Fragment } from "react";
import { CreatePost, P, Post } from "../components";
import styles from "./index.module.scss";
import { TPost } from "../types";

type THomeState = { posts: TPost[]; error: boolean };

export default class Home extends Component<Record<string, never>, THomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      posts: [],
      error: false,
    };
  }
  async componentDidMount() {
    try {
      const response = await fetch("/api/getPosts");
      if (!response.ok) throw new Error();
      this.setState({ posts: await response.json() });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  render() {
    const { error, posts } = this.state;
    return (
      <div className={styles.main}>
        {error && <P>Error occurred :(</P>}
        <CreatePost
          onCreate={(posts) => {
            this.setState({ posts, error: false });
          }}
        />

        {posts.map(({ title, content }, i) => (
          <Fragment key={i}>
            <hr />

            <Post title={title}>
              {content.split("\n").map((line: string, i) => (
                <P key={i}>{line}</P>
              ))}
            </Post>
          </Fragment>
        ))}
      </div>
    );
  }
}
