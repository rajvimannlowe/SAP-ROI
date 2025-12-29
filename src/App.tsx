import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

// Pages
import { Login } from "./pages/auth/Login";
import { EnterpriseOverview } from "./pages/enterprise/EnterpriseOverview";
import { SAPOverview } from "./pages/sap/SAPOverview";
import { ModuleView } from "./pages/sap/ModuleView";
import { DDDashboard } from "./pages/sap/dd/DDDashboard";
import { CreateDDItem } from "./pages/sap/dd/CreateDDItem";
import { ViewDDItem } from "./pages/sap/dd/ViewDDItem";
import { EditDDItem } from "./pages/sap/dd/EditDDItem";

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

            {/* SAP Routes */}
            <Route path="sap" element={<SAPOverview />} />
            <Route path="sap/:moduleId" element={<ModuleView />} />
            <Route
              path="sap/:moduleId/:subModuleId"
              element={<DDDashboard />}
            />
            <Route
              path="sap/:moduleId/:subModuleId/create"
              element={
                <ProtectedRoute requirePermission="create">
                  <CreateDDItem />
                </ProtectedRoute>
              }
            />
            <Route path="sap/dd-item/:itemId" element={<ViewDDItem />} />
            <Route
              path="sap/dd-item/:itemId/edit"
              element={
                <ProtectedRoute requirePermission="edit">
                  <EditDDItem />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to enterprise */}
            <Route path="*" element={<Navigate to="/enterprise" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
