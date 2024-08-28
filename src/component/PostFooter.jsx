/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FaHeart, FaComment, FaRetweet } from "react-icons/fa";

const PostFooter = ({ post, handleLike, toggleComments, handleRepost }) => (
  <div className="post-footer">
    <button onClick={handleLike} className={post.isLiked ? "active" : ""}>
      <FaHeart /> Like {post.likes.count}
    </button>
    <button onClick={toggleComments}>
      <FaComment /> Comment {post.comments.length}
    </button>
    <button onClick={handleRepost}>
      <FaRetweet /> Repost {post.reposts}
    </button>
  </div>
);

export default PostFooter;
