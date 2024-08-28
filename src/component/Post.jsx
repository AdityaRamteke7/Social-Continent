/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, commentPost, repostPost } from "../redux/postsSlice";
import { FaThumbsUp, FaComment, FaRetweet } from "react-icons/fa";
import YouLogo from "../assets/YouLogo.jpeg";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(
    post.comments.comment ? [post.comments.comment] : []
  );
  const [newComment, setNewComment] = useState(""); 

  const handleLike = () => {
    dispatch(likePost(post.hash));
  };

  const handleAddComment = () => {
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
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.author.pfp}
          alt={`${post.author.display_name}'s avatar`}
          className="avatar"
        />
        <div>@{post.author.display_name}</div>
        <div className="post-username">
          <p>{new Date(post.timestamp).toLocaleString()}</p>
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
          <FaThumbsUp /> Like ({post.likes.count})
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <FaComment /> Comment ({comments.length})
        </button>
        <button onClick={() => dispatch(repostPost(post.hash))}>
          <FaRetweet /> Repost ({post.reposts})
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
                  {new Date(comment.timestamp).toLocaleString()}
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
            />
            <button onClick={handleAddComment}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
