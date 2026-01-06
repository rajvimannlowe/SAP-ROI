import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

// Pages
import { Login } from "./pages/auth/Login";
import { EnterpriseOverview } from "./pages/enterprise/EnterpriseOverview";
import { PhaseIROIPortfolio } from "./pages/enterprise/phase-one/erp/sap-s4hana/PhaseIROIPortfolio";
import { ROICatalogExplorer } from "./pages/enterprise/phase-one/erp/sap-s4hana/ROICatalogExplorer";
import { ProductROIBlueprint } from "./pages/enterprise/phase-one/erp/sap-s4hana/ProductROIBlueprint";
import RoiAggregation from "./pages/enterprise/phase-one/erp/sap-s4hana/modules/FI/roi-aggregation";
import { ModuleROICockpit } from "./pages/enterprise/phase-one/erp/sap-s4hana/ModuleROICockpit";
import { KPIDetailView } from "./pages/enterprise/phase-one/erp/sap-s4hana/KPIDetailView";
import { KPITrendAnalysis } from "./pages/enterprise/phase-one/erp/sap-s4hana/KPITrendAnalysis";

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
            <Route
              path="phase-i/catalog/:id/blueprint"
              element={<ProductROIBlueprint />}
            />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit"
              element={<ModuleROICockpit />}
            />
            <Route path="roi-aggregation" element={<RoiAggregation />} />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId"
              element={<KPIDetailView />}
            />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/trend"
              element={<KPITrendAnalysis />}
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
