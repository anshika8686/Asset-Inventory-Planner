
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Asset_Management from './pages/Asset_Management'
import Asset_Information from './pages/Asset_Information'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
        <Route element={<AuthLayout/>}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        </Route>

        <Route element={<ProtectedRoute/>}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<Asset_Management />} />
          <Route path="/asset-information" element={<Asset_Information />}/>
        </Route>
        </Route>
      </Routes>
      
  )
}

export default AppRouter