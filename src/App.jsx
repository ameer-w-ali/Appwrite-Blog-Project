import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from './appwrite/auth'
import postService from './appwrite/services'
import { login, logout } from "./store/authSlice";
import { getPosts } from './store/postSlice'
import { Header, Footer } from './components'
import { Outlet } from "react-router-dom";

export default function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getUser()
      .then(user => {
        user ? dispatch(login(user)) : dispatch(logout());
      })
      .catch(err => err)
      .finally(() => setLoading(false))
    postService.getPosts()
      .then(posts => dispatch(getPosts(posts.documents)))
  }, [])

  return loading ? null : (
    <div className="min-h-screen flex content-between flex-wrap">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );

}