/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch } from "react-redux";
import { likePost, commentPost, repostPost } from "../redux/postsSlice";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const { author, text, images, likes, comments, timestamp } = post;

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={author.pfp}
          alt={`${author.display_name}'s avatar`}
          className="avatar"
        />
        <div>
          <h3>{author.display_name}</h3>
          <p>
            @{author.username} · {new Date(timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Text */}
      {text && <p>{text}</p>}

      {/* Post Image */}
      {images.length > 0 && (
        <div className="post-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.caption || "Post Image"}
              className="post-image"
            />
          ))}
        </div>
      )}

      {/* Post Footer */}
      <div className="post-footer">
        <button onClick={() => dispatch(likePost(post.hash))}>
          Like ({likes.count})
        </button>
        <button onClick={() => dispatch(commentPost(post.hash))}>
          Comment ({comments.count})
        </button>
        <button onClick={() => dispatch(repostPost(post.hash))}>
          Repost ({post.reposts})
        </button>
      </div>

      {/* Comments Section */}
      {comments.count > 0 && (
        <div className="post-comments">
          <p>Latest Comment:</p>
          <div className="comment">
            <img
              src={comments.comment.author.pfp}
              alt={`${comments.comment.author.display_name}'s avatar`}
              className="comment-avatar"
            />
            <div>
              <h4>{comments.comment.author.display_name}</h4>
              <p>{comments.comment.text}</p>
              <p className="timestamp">
                {new Date(comments.comment.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
