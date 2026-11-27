import React from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Asset_Management from './pages/Asset_Management'
import Asset_Information from './pages/Asset_Information'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<Asset_Management />} />
          <Route path="/asset-information" element={<Asset_Information />}/>
        </Route>
      </Routes>
  )
}

export default AppRouter