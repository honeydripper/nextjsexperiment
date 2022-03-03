import React from "react";
import { ChangeEvent, Component, createRef, FormEvent, RefObject } from "react";
import styles from "./createPost.module.scss";
import { TPost } from "../types";

type TCreatePostState = TPost & {
  error: boolean;
};

type TCreatePostProps = {
  onCreate: (data: TPost[]) => void;
};

export class CreatePost extends Component<TCreatePostProps, TCreatePostState> {
  form: RefObject<HTMLFormElement> = createRef();
  constructor(props: TCreatePostProps) {
    super(props);

    this.state = {
      title: "",
      content: "",

      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  async handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { content, title } = this.state;
    this.setState({ error: false });

    try {
      const response = await fetch("/api/createPost", {
        method: "POST",
        body: JSON.stringify({ content, title }),
      });

      if (!response.ok) throw new Error();

      const posts = await response.json();
      this.props.onCreate(posts);
    } catch (e) {
      this.setState({
        error: true,
      });
    }

    this.form.current?.reset();
  }

  render() {
    const { handleChange, handleSubmit, form, state } = this;
    return (
      <form className={styles.createPost} onSubmit={handleSubmit} ref={form}>
        {state.error && <p>Error occurred, please try again</p>}
        <label>Post title</label>
        <input type="text" name="title" required onChange={handleChange} />
        <textarea name="content" required onChange={handleChange} />
        <button>Create Post</button>
      </form>
    );
  }
}
