import React, { Component } from "react";
import styles from "./paragraph.module.scss";

export class Paragraph extends Component {
  render() {
    const { children } = this.props;
    return <p className={styles.paragraph}>{children}</p>;
  }
}
