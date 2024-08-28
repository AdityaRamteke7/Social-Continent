/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import formatTimestamp from "./constant";
const PostComments = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}) => (
  <div className="post-comments">
    {comments.map((comment, index) => (
      <div key={index} className="comment">
        <img
          src={comment.author.pfp}
          alt={`${comment.author.display_name}'s avatar`}
          className="comment-avatar"
        />
        <div>
          <h4>{comment.author.display_name}</h4>
          <p>{comment.text}</p>
          <p className="timestamp">{formatTimestamp(comment.timestamp)}</p>
        </div>
      </div>
    ))}

    <div className="add-comment">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        required
      />
      <FaArrowCircleUp size={"30px"} color="white" onClick={handleAddComment} />
    </div>
  </div>
);

export default PostComments;
