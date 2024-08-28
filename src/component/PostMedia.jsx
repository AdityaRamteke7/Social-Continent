/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const PostMedia = ({ media }) => {
  const [mediaContentTypes, setMediaContentTypes] = useState([]);

  const fetchContentType = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.headers.get("Content-Type");
    } catch (error) {
      console.error("Error fetching content type:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadMediaContentTypes = async () => {
      const types = await Promise.all(
        media.map((item) => fetchContentType(item.url))
      );
      setMediaContentTypes(types);
    };
    loadMediaContentTypes();
  }, [media]);

  return (
    <div className="post-media">
      {media.map((item, index) => {
        const contentType = mediaContentTypes[index];
        if (contentType?.includes("video")) {
          return (
            <video
              key={index}
              controls
              autoPlay
              muted
              playsInline
              className="post-video"
            >
              <source src={item.url} type={contentType} />
              Your browser does not support the video tag.
            </video>
          );
        } else {
          return (
            <img
              key={index}
              src={item.url}
              alt={item.caption || "Post Image"}
              className="post-image"
            />
          );
        }
      })}
    </div>
  );
};

export default PostMedia;
