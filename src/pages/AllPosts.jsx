import { Card, Container } from '../components'
import appwriteService from '../appwrite/services'
import { useState } from 'react'

export default function AllPosts() {

  const [posts, setPosts] = useState([])

  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents)
    }
  })

  return (
    <Container>
      <div className="flex flex-wrap">
        {posts.map(post => (
          <div key={post.$id} className='p-2 w-1/4'>
            <Card {...post} />
          </div>
        ))}
      </div>
    </Container>
  )
}