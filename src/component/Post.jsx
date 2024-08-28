/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, commentPost, repostPost } from "../redux/postsSlice";
import { FaHeart, FaComment, FaRetweet, FaArrowCircleUp } from "react-icons/fa";
import YouLogo from "../assets/YouLogo.jpeg";

import { formatTimestamp } from "./constant";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(
    post.comments.comment ? [post.comments.comment] : []
  );
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleLike = () => {
    dispatch(likePost(post.hash));
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      setError("required");
      return;
    }

    const comment = {
      text: newComment,
      author: {
        display_name: "You",
        pfp: YouLogo,
      },
      timestamp: Date.now(),
    };
    setComments([...comments, comment]);
    setNewComment("");
    setError("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.author.pfp}
          alt={`${post.author.display_name}'s avatar`}
          className="avatar"
        />
        <div> @{post.author.display_name}</div>
        <div className="post-username">
          <p>{formatTimestamp(post.timestamp)}</p>
        </div>
      </div>

      {post.images.length > 0 && (
        <div className="post-images">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.caption || "Post Image"}
              className="post-image"
            />
          ))}
        </div>
      )}

      <div className="post-footer">
        <button onClick={handleLike} className={post.isLiked ? "active" : ""}>
          <FaHeart /> Like {post.likes.count}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <FaComment /> Comment {comments.length}
        </button>
        <button onClick={() => dispatch(repostPost(post.hash))}>
          <FaRetweet /> Repost {post.reposts}
        </button>
      </div>

      {showComments && (
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
                <p className="timestamp">
                  {/* {new Date(comment.timestamp).toLocaleString()} */}
                  {formatTimestamp(comment.timestamp)}
                </p>
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
            <FaArrowCircleUp
              size={"30px"}
              color="white"
              onClick={handleAddComment}
            />
            {/* {error && <p className="error-message">{error}</p>}  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
