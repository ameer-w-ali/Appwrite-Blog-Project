import { Link } from "react-router-dom";
import service from '../appwrite/services';

export default function Card({
  $id,
  Title,
  image,
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-neutral-100 rounded-xl p-4">
        <div className="w-full flex justify-center mb-4">
          <img src={service.getFilePreview(image)} alt={Title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{Title}</h2>
      </div>
    </Link>
  )
}