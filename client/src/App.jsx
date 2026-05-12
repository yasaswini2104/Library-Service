import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import BooksPage from './pages/BooksPage'
import AddBookPage from './pages/AddBookPage'
import MembersPage from './pages/MembersPage'
import RegisterMemberPage from './pages/RegisterMemberPage'
import IssuePage from './pages/IssuePage'
import ReturnPage from './pages/ReturnPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/add" element={<AddBookPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="members/register" element={<RegisterMemberPage />} />
          <Route path="issues" element={<IssuePage />} />
          <Route path="returns" element={<ReturnPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
