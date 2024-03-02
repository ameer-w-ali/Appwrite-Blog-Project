import { useDispatch } from "react-redux"
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

export default function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout()
      .then(() => dispatch(logout()))
      .catch()
      .finally()
  }
  return (
    <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>
  )
}