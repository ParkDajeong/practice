import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input } from "antd";

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onhandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    Axios.post("/api/comment/saveComment", variables) //
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.result);
          props.refreshFunction(response.data.result);
          setCommentValue("");
          setOpenReply(false);
        } else {
          alert("댓글 저장에 실패하였습니다.");
        }
      });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment //
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="profile_IMG" />}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && (
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
      )}
    </div>
  );
}

export default SingleComment;
