import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");

  const onhandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
    };

    Axios.post("/api/comment/saveComment", variables) //
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.result);
          props.refreshFunction(response.data.result);
          setCommentValue("");
        } else {
          alert("댓글 저장에 실패하였습니다.");
        }
      });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {props.commentList &&
        props.commentList.map(
          (comment, idx) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment //
                  postId={props.postId}
                  comment={comment}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment //
                  postId={props.postId}
                  parentCommentId={comment._id}
                  commentList={props.commentList}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea //
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={onhandleChange}
          value={CommentValue}
          placeholder="코멘트를 작성해주세요."
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
