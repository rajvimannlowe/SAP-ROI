import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

// Pages
import { Login } from "./pages/auth/Login";
import { EnterpriseOverview } from "./pages/enterprise/EnterpriseOverview";
import { PhaseIROIPortfolio } from "./pages/enterprise/phase-one/erp/sap-s4hana/PhaseIROIPortfolio";
import { ROICatalogExplorer } from "./pages/enterprise/phase-one/erp/sap-s4hana/ROICatalogExplorer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/enterprise" replace />} />
            <Route path="enterprise" element={<EnterpriseOverview />} />
            <Route path="phase-i" element={<PhaseIROIPortfolio />} />
            <Route path="phase-i/catalog" element={<ROICatalogExplorer />} />

            {/* Catch all - redirect to enterprise */}
            <Route path="*" element={<Navigate to="/enterprise" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
