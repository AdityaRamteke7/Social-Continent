import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import Post from "./Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => (
  <div className="post-skeleton">
    <div className="post-header-skeleton">
      <Skeleton circle={true} height={40} width={40} />
      <div style={{ marginLeft: "10px", flex: 1 }}>
        <Skeleton width={100} />
        <Skeleton width={60} />
      </div>
    </div>
    <div className="post-media-skeleton">
      <Skeleton height={200} />
    </div>
    <div className="post-footer-skeleton">
      <Skeleton width={80} height={20} />
      <Skeleton width={80} height={20} style={{ marginLeft: "10px" }} />
      <Skeleton width={80} height={20} style={{ marginLeft: "10px" }} />
    </div>
  </div>
);

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div className="timeline">
      {status === "loading"
        ? // Render multiple skeletons to simulate a loading list of posts
          Array.from({ length: 5 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        : posts.map((post) => <Post key={post.hash} post={post} />)}
    </div>
  );
};

export default PostList;
