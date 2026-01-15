import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { SAP_S4HANA_BLUEPRINT } from "@/data/productBlueprintData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Clock, 
  User, 
  FileText, 
  Database, 
  Calculator,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const MetricDetail = () => {
    const { id, metricId } = useParams();
    
    // Find the metric from both primary and secondary metrics
    const allMetrics = [
        ...SAP_S4HANA_BLUEPRINT.primaryMetrics,
        ...SAP_S4HANA_BLUEPRINT.secondaryMetrics
    ];
    
    const metric = allMetrics.find(m => m.id === metricId);
    
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

    const getStatusIcon = (status: string) => {
        return status === "Active" ? (
            <CheckCircle className="h-4 w-4 text-emerald-600" />
        ) : (
            <AlertTriangle className="h-4 w-4 text-amber-600" />
        );
    };

    const getStatusBadge = (status: string) => {
        return status === "Active" ? (
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {status}
            </Badge>
        ) : (
            <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200">
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title={metric.title}
                subtitle={`${metric.id} - ROI Metric Details`}
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
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Target className="h-4 w-4" />
                                Unit
                            </div>
                            <p className="font-semibold">{metric.unit}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-4 w-4" />
                                Owner
                            </div>
                            <p className="font-semibold">{metric.owner}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                Refresh Frequency
                            </div>
                            <p className="font-semibold">{metric.refresh}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getStatusIcon(metric.status)}
                                Status
                            </div>
                            {getStatusBadge(metric.status)}
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                Dimension
                            </div>
                            <Badge variant="outline">{metric.dimension}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Definition and Rationale */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Metric Definition</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{metric.metricDefinition}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Business Rationale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{metric.businessRationale}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Targets and Thresholds */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Targets & Thresholds
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-emerald-700">Target</div>
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                <p className="font-semibold text-emerald-800">{metric.target}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-amber-700">Amber Threshold</div>
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="font-semibold text-amber-800">{metric.amberThreshold}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-red-700">Red Threshold</div>
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="font-semibold text-red-800">{metric.redThreshold}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Computation Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Computation Steps
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {metric.computationSection.map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                                    {index + 1}
                                </div>
                                <p className="text-sm leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Data Sources and Calculation Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            Data Sources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {metric.dataSource.map((source, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm">{source}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calculator className="h-5 w-5" />
                            Calculation Method
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {metric.calculationMethod.map((method, index) => (
                                <div key={index} className="p-3 bg-gray-50 border rounded-lg">
                                    <code className="text-sm font-mono">{method}</code>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MetricDetail;