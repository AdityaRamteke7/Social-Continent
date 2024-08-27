import React from 'react';
import { useDispatch } from 'react-redux';
import { likePost, commentPost, repostPost } from '../redux/postsSlice';
import './InteractionButtons.css';

const InteractionButtons = ({ postId, likes, comments, reposts }) => {
  const dispatch = useDispatch();

  return (
    <div className="interaction-buttons">
      <button onClick={() => dispatch(likePost(postId))}>Like {likes}</button>
      <button onClick={() => dispatch(commentPost(postId))}>Comment {comments}</button>
      <button onClick={() => dispatch(repostPost(postId))}>Repost {reposts}</button>
    </div>
  );
};

export default InteractionButtons;
