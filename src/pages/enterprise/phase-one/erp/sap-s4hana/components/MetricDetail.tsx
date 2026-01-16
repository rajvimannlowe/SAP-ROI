import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/roi/cards/MetricCard";
import { DrilldownTable, TableColumn } from "@/components/roi/DrilldownTable";
import { SupportingKPI } from "@/data/productBlueprintData";
import {
  Target,
  Clock,
  FileText,
  Database,
  Calculator,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const MetricDetail = () => {
  const { id, metricId } = useParams();

  // Find the metric from both primary and secondary metrics
  const allMetrics = [
    ...SAP_S4HANA_BLUEPRINT.primaryMetrics,
    ...SAP_S4HANA_BLUEPRINT.secondaryMetrics,
  ];

  const metric = allMetrics.find((m) => m.id === metricId);

  if (!metric) {
    return (
      <div>
        <PageHeader
          title="Metric Not Found"
          subtitle="The requested metric could not be found"
          backTo={`/phase-i/catalog/${id}/blueprint`}
          backLabel="Back to Blueprint"
        />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge
        variant="secondary"
        className="bg-emerald-50 text-emerald-700 border-emerald-200"
      >
        {status}
      </Badge>
    ) : status === "In Progress" ? (
      <Badge
        variant="secondary"
        className="bg-amber-50 text-amber-700 border-amber-200"
      >
        {status}
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-slate-50 text-slate-700 border-slate-200"
      >
        {status}
      </Badge>
    );
  };

  // Define columns for both Supporting KPI and Indirect KPI tables (shared)
  const kpiTableColumns: TableColumn<SupportingKPI>[] = [
    {
      key: "kpiId",
      header: "KPI ID",
      accessor: (row) => (
        <span className="font-mono text-sm text-slate-700">{row.kpiId}</span>
      ),
      align: "left",
      width: "140px",
      className: "min-w-[140px] max-w-[140px]",
    },
    {
      key: "kpiName",
      header: "KPI NAME",
      accessor: (row) => (
        <span className="font-medium text-slate-800">{row.kpiName}</span>
      ),
      align: "left",
      width: "280px",
      className: "min-w-[280px] max-w-[280px]",
    },
    {
      key: "subModule",
      header: "SUB-MODULE",
      accessor: (row) => (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          {row.subModule}
        </Badge>
      ),
      align: "center",
      width: "12%",
      className: "w-[12%]",
    },
    {
      key: "contributionType",
      header: "CONTRIBUTION TYPE",
      accessor: (row) => (
        <span className="text-sm text-slate-600">{row.contributionType}</span>
      ),
      align: "left",
      width: "28%",
      className: "w-[28%]",
    },
    {
      key: "status",
      header: "STATUS",
      accessor: (row) => getStatusBadge(row.status),
      align: "center",
      width: "10%",
      className: "w-[10%]",
    },
    {
      key: "owner",
      header: "OWNER",
      accessor: (row) => (
        <span className="text-sm text-slate-700">{row.owner}</span>
      ),
      align: "left",
      width: "13%",
      className: "w-[13%]",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={metric.title}
        subtitle={`${metric.id} - ${metric.owner}`}
        backTo={`/phase-i/catalog/${id}/blueprint`}
        backLabel="Back to Blueprint"
      />

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Metric Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={Target}
              value={metric.unit}
              title="Unit"
              color="#0EA5E9"
            />
            <MetricCard
              icon={Clock}
              value={metric.refresh}
              title="Refresh Frequency"
              color="#F59E0B"
            />
            <MetricCard
              icon={metric.status === "Active" ? CheckCircle : AlertTriangle}
              value={metric.status}
              title="Status"
              color={metric.status === "Active" ? "#10B981" : "#EF4444"}
            />
            <MetricCard
              icon={FileText}
              value={metric.dimension}
              title="Dimension"
              color="#8B5CF6"
            />
          </div>

          <div className="pt-4 border-t"></div>
        </CardContent>
      </Card>

      {/* Definition and Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metric Definition */}
        <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-200/60 shadow-sm">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Metric Definition
            </h3>
          </div>
          <div className="pl-14">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {metric.metricDefinition}
            </p>
          </div>
        </div>

        {/* Business Rationale */}
        <div className="bg-pink-50/80 border border-pink-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-pink-100/80 border border-pink-200/60 shadow-sm">
              <TrendingUp className="h-5 w-5 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Business Rationale
            </h3>
          </div>
          <div className="pl-14">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {metric.businessRationale}
            </p>
          </div>
        </div>
      </div>

      {/* Targets and Thresholds */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-blue-100/80 border border-blue-200/60 shadow-sm">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Targets & Thresholds
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target */}
          <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-100/80 border border-emerald-200/60 shadow-sm">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-semibold text-emerald-700">Target</h4>
            </div>
            <div className="pl-10">
              <p className="text-lg font-bold text-emerald-800">
                {metric.target}
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                Optimal Performance
              </p>
            </div>
          </div>

          {/* Amber Threshold */}
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-100/80 border border-amber-200/60 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
              </div>
              <h4 className="text-sm font-semibold text-amber-700">
                Amber Threshold
              </h4>
            </div>
            <div className="pl-10">
              <p className="text-lg font-bold text-amber-800">
                {metric.amberThreshold}
              </p>
              <p className="text-xs text-amber-600 mt-1">Needs Attention</p>
            </div>
          </div>

          {/* Red Threshold */}
          <div className="bg-red-50/80 border border-red-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-100/80 border border-red-200/60 shadow-sm">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <h4 className="text-sm font-semibold text-red-700">
                Red Threshold
              </h4>
            </div>
            <div className="pl-10">
              <p className="text-lg font-bold text-red-800">
                {metric.redThreshold}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Critical Action Required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Method */}
      <div className="bg-indigo-50/80 border border-indigo-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-100/80 border border-indigo-200/60 shadow-sm">
            <Calculator className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Calculation Method
          </h3>
        </div>
        <div className="space-y-3">
          {metric.calculationMethod.map((method, index) => (
            <div
              key={index}
              className="bg-white/60 border border-indigo-200/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-md flex items-center justify-center text-xs font-bold shadow-sm">
                  {index + 1}
                </div>
                <code className="text-sm font-mono text-slate-700 leading-relaxed flex-1">
                  {method}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources and Calculation Method */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources */}
        <div className="bg-cyan-50/80 border border-cyan-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-100/80 border border-cyan-200/60 shadow-sm">
              <Database className="h-5 w-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Data Sources
            </h3>
          </div>
          <div className="space-y-3">
            {metric.dataSource.map((source, index) => (
              <div
                key={index}
                className="bg-white/60 border border-cyan-200/40 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-3 h-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-sm"></div>
                  <span className="text-sm text-slate-700 font-medium">
                    {source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Computation Section */}
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/60 shadow-sm">
              <Calculator className="h-5 w-5 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Computation Steps
            </h3>
          </div>

          <div className="space-y-4">
            {metric.computationSection.map((step, index) => (
              <div
                key={index}
                className="bg-white/60 border border-slate-200/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-slate-700 font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporting KPI Table - Only show if there's data */}
      {metric.supportingKPI && metric.supportingKPI.length > 0 && (
        <div className="space-y-4">
          <DrilldownTable
            columns={kpiTableColumns}
            data={metric.supportingKPI}
            title="Supporting KPIs"
            subtitle={`${metric.supportingKPI.length} KPIs supporting ${metric.title}`}
            emptyMessage="No supporting KPIs found"
            emptyDescription="This metric does not have any supporting KPIs defined"
            accentColor="#2563EB"
          />
        </div>
      )}

      {/* Indirect KPI Table - Conditionally rendered */}
      {/* Only show if Supporting KPIs have data (summary table condition) */}
      {metric.supportingKPI &&
        metric.supportingKPI.length > 0 &&
        metric.indirectKPI &&
        metric.indirectKPI.length > 0 && (
          <div className="space-y-4">
            <DrilldownTable
              columns={kpiTableColumns}
              data={metric.indirectKPI}
              title="Indirect KPIs"
              subtitle={`${metric.indirectKPI.length} indirect KPIs related to ${metric.title}`}
              emptyMessage="No indirect KPIs found"
              emptyDescription="This metric does not have any indirect KPIs defined"
              accentColor="#8B5CF6"
            />
          </div>
        )}
    </div>
  );
};

export default MetricDetail;
