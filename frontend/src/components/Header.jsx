
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Playlister</Link>
      </div>
      <>
        {user ? (
          
            <button className='btn' onClick={onLogout}>
               Logout
            </button>
          
        ) : (
          <>
            <p>
              <Link to='/login'>
                 Login
              </Link>
            </p>
            <p>
              <Link to='/register'>
                 Register
              </Link>
            </p>
          </>
        )}
      </>
    </header>
  )
}

export default Header