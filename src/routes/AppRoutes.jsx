import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import RecommendationList from '../pages/RecommendationList'
import RecommendationCreate from '../pages/RecommendationCreate'
import RecommendationEdit from '../pages/RecommendationEdit'
import Search from '../pages/Search'
import Reports from '../pages/Reports'
import PublicSearch from '../pages/PublicSearch'
import MasterData from '../pages/MasterData'
import AuditLog from '../pages/AuditLog'
import UserManagement from '../pages/UserManagement'
import UserCreate from '../pages/UserCreate'
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
        <Route path="/public-search" element={<PublicSearch />} />

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

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Layout>
                <Search />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/master-data"
          element={
            <ProtectedRoute>
              <Layout>
                <MasterData />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute>
              <Layout>
                <AuditLog />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <Layout>
                <UserCreate />
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
