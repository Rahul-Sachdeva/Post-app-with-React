import React, {useState, useEffect} from 'react'
import {Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([])
        .then((posts)=> {
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((error)=> {
            console.log(error)
        });
    },[])
  return (
    <div className='w-ful py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
