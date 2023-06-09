import React from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
	const dispatch = useDispatch()
	const  userData = useSelector((state)=> state.auth.data)
	const  {posts, tags} = useSelector((state)=> state.posts)
	const isPostsLoading = posts.status ==='loading'
	const isTagsLoading = tags.status ==='loading'
	React.useEffect(()=>{
		dispatch(fetchPosts())
		dispatch(fetchTags())
	},[dispatch])
  return (
    <>
      <Grid container spacing={4}>
        <Grid item  xs={8} sm={12}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? <Post key={index} isLoading={true}/> :(
						 <Post
						 id={obj._id}
						 title={obj.title}
						 imageUrl={ obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
						 user={obj.user}
						 createdAt={obj.createdAt}
						 viewsCount={obj.viewsCount}
						 commentsCount={3}
						 tags={obj.tags}
						 isEditable={userData?._id === obj.user._id}
					 />
					))}
        </Grid>
        <Grid item xs={4}>
          <TagsBlock items={tags.items} isLoading={isTagsLoading}  className="item__tags"/>
        </Grid>
      </Grid>
    </>
  );
};
