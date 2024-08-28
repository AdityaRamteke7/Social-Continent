/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { formatTimestamp } from "./constant";

const PostHeader = ({ author, timestamp }) => (
  <div className="post-header">
    <img
      src={author.pfp}
      alt={`${author.display_name}'s avatar`}
      className="avatar"
    />
    <div>@{author.display_name}</div>
    <div className="post-username">
      <p>{formatTimestamp(timestamp)}</p>
    </div>
  </div>
);

export default PostHeader;
