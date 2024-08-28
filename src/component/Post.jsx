/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, commentPost, repostPost } from "../redux/postsSlice";
import { FaThumbsUp, FaComment, FaRetweet } from "react-icons/fa";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(
    post.comments.comment ? [post.comments.comment] : []
  );

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.author.pfp}
          alt={`${post.author.display_name}'s avatar`}
          className="avatar"
        />
        <div>
          @{post.author.display_name}
        </div>
        <div className="post-username">
          <p>{new Date(post.timestamp).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Text */}
      {post.text && <p>{post.text}</p>}

      {/* Post Image */}
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

      {/* Post Footer with Icons */}
      <div className="post-footer">
        <button onClick={() => dispatch(likePost(post.hash))}>
          <FaThumbsUp /> Like ({post.likes.count})
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <FaComment /> Comment ({comments.length})
        </button>
        <button onClick={() => dispatch(repostPost(post.hash))}>
          <FaRetweet /> Repost ({post.reposts})
        </button>
      </div>

      {/* Comments Section */}
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
        </div>
      )}
    </div>
  );
};

export default Post;
