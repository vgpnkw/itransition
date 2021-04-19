import 'materialize-css'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>

        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
