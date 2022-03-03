import React, { Component } from "react";
import styles from "./post.module.scss";

export class Post extends Component<{ title: string }> {
  render() {
    const { title, children } = this.props;
    return (
      <div className={styles.main}>
        <h1>{title}</h1>
        {children}
      </div>
    );
  }
}
