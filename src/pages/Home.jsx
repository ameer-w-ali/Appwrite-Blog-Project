import { useEffect } from 'react';
import service from '../appwrite/services'
import { useState } from 'react';
import { Container, Card } from '../components'
import { useSelector } from 'react-redux';

export default function Home() {

  const [posts, setPosts] = useState([]);

  const newPosts = useSelector(state => state.posts.list);
  useEffect(() => {
    setPosts(newPosts);
    // service.getPosts().then(posts => setPosts(posts?.documents))
  }, [posts])

  if (posts.length === 0) return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold">
              No post available
            </h1>
          </div>
        </div>
      </Container>
    </div>
  )

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <Card {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}