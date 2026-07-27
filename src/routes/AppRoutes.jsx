import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import RecommendationList from '../pages/RecommendationList'
import RecommendationCreate from '../pages/RecommendationCreate'
import RecommendationEdit from '../pages/RecommendationEdit'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes (no layout/sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Admin routes (wrapped in ProtectedRoute + Layout with Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Layout>
                <RecommendationList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/new"
          element={
            <ProtectedRoute>
              <Layout>
                <RecommendationCreate />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <RecommendationEdit />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/:id/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <RecommendationEdit />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
