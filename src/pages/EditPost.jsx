import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import { useEffect } from 'react';
import service from '../appwrite/services'

export default function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then(post => setPost(post))
    }
    else {
      navigate('/')
    }
  }, [slug, navigate])

  return psot ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}