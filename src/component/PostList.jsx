import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import Post from "./Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.status);

  console.log(posts, status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <div className="timeline">
      {status === "loading" ? (
        <>
          <Skeleton animation="wave" width={30} height={30} />
          <Skeleton animation="wave" width={"100%"} height={20} />
        </>
      ) : (
        posts.map((post) => <Post key={post.hash} post={post} />)
      )}
    </div>
  );
};

export default PostList;
