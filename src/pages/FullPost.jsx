import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import {CommentsBlock} from '../components/CommentsBlock'
import ReactMarkdown from 'react-markdown'

 import axios from '../axios'
export const FullPost = () => {
	const [data, setData] = React.useState()
	const [isLoading, setIsLoading] = React.useState(true)
	const {id} = useParams()

	React.useEffect(()=>{
axios.get(`/posts/${id}`).then(res =>{
setData(res.data)
setIsLoading(false)
}).catch (err =>{
	console.warn(err)
	alert('Ошибка при получении статьи')
})
	}, [])

if (isLoading){
	return <Post isLoading={isLoading}     isFullPost />
}

  return (
    <>
      <Post
        id={data._id}
				title={data.title}
				imageUrl={ data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
				// imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
				user={data.user}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={3}
				tags={data.tags}
        isFullPost
      >
        <p>
					<ReactMarkdown children={data.text}/>
        </p>
      </Post>
    </>
  );
};
