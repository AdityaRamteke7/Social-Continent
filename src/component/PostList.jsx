import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";
import Post from "./Post";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  console.log(posts );
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="timeline">
      {posts.map((post) => (
        <Post key={post.hash} post={post} />
      ))}
    </div>
  );
};

export default PostList;
