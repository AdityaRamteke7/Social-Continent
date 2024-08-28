/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, commentPost, repostPost } from "../redux/postsSlice";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import PostComments from "./PostComments";
import YouLogo from "../assets/YouLogo.jpeg"

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

  const toggleComments = () => setShowComments(!showComments);

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      setError("required");
      return;
    }

    const comment = {
      text: newComment,
      author: { display_name: "You", pfp: YouLogo },
      timestamp: Date.now(),
    };
    setComments([...comments, comment]);
    setNewComment("");
    setError("");
  };

  return (
    <div className="post">
      <PostHeader author={post.author} timestamp={post.timestamp} />
      {post.images.length > 0 && <PostMedia media={post.images} />}
      <PostFooter
        post={post}
        handleLike={handleLike}
        toggleComments={toggleComments}
        handleRepost={() => dispatch(repostPost(post.hash))}
      />
      {showComments && (
        <PostComments
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Post;
