import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { LibraryPage } from './pages/LibraryPage';
import { DiscoverPage } from './pages/DiscoverPage';

function App() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 인증 필요 라우트 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Route>
      </Route>

      {/* 기본 진입 */}
      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
}

export default App;
