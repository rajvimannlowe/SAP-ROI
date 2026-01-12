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
import { ROIAggregation } from "./pages/enterprise/phase-one/erp/sap-s4hana/ROIAggregation";
import { ModuleROICockpit } from "./pages/enterprise/phase-one/erp/sap-s4hana/ModuleROICockpit";
import RoiIntentOverview from "./pages/enterprise/phase-one/erp/sap-s4hana/ROIIntentOverview";
import { KPIDetailView } from "./pages/enterprise/phase-one/erp/sap-s4hana/KPIDetailView";
import { KPITrendAnalysis } from "./pages/enterprise/phase-one/erp/sap-s4hana/KPITrendAnalysis";
import { ControlEvidence } from "./pages/enterprise/phase-one/erp/sap-s4hana/ControlEvidence";
import { ActionTracker } from "./pages/enterprise/phase-one/erp/sap-s4hana/ActionTracker";
import DeviationTickets from "./pages/enterprise/phase-one/erp/sap-s4hana/DeviationTickets";
import DeviationTicketDetails from "./pages/enterprise/phase-one/erp/sap-s4hana/DeviationTicketDetails";

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
            <Route path="roi-aggregation" element={<ROIAggregation />} />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId"
              element={<KPIDetailView />}
            />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/trend"
              element={<KPITrendAnalysis />}
            />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/evidence"
              element={<ControlEvidence />}
            />
            <Route
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/actions"
              element={<ActionTracker />}
            />

            <Route 
              path="roi-intent-overview/:intentId" 
              element={<RoiIntentOverview />} 
            />

            <Route 
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/actions/deviation-tickets" 
              element={<DeviationTickets />} 
            />

            <Route 
              path="phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/actions/deviation-tickets/:ticketId" 
              element={<DeviationTicketDetails />} 
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
