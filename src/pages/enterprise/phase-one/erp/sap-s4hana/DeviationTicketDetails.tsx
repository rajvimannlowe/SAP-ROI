import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Bubbles, FileText, TrendingUp, Building, AlertTriangle, Calendar, User, Clock, DollarSign, Info, Target, BookOpen, List, CheckCircle, Wrench, Shield, UserCheck } from "lucide-react"
import { useParams } from "react-router-dom"
import { deviationTicketData } from "@/data/ticketDeviationData"

const DeviationTicketDetails = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    
    const ticket = deviationTicketData.find(t => t.ticketId === ticketId);
    const pageTitle = ticket ? `${ticket.ticketId} - ${ticket.relatedKPI}` : ticketId || "Ticket Details";

    return (
        <div>
            {/* Page Header Section */}
            <div>
                <PageHeader
                    title={pageTitle}
                    subtitle={"ROI Ticket – Detail & Root Cause Analysis"}
                    backTo="/phase-i/catalog/:id/blueprint/:moduleId/cockpit/:kpiId/actions/deviation-tickets"
                    backLabel="Back to Ticketing Hub"
                    rightContent={
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                size="sm"
                                className="gap-2 bg-linear-to-r from-[#4160F0] to-[#FF6700] text-white hover:from-[#3550D9] hover:to-[#E65C00] shadow-sm"
                                //   onClick={() => navigate(`/`)}
                                onClick={() => alert(`Navigate to Feedback & Improvement Loop`)}
                            >
                                <span className="hidden sm:inline">Feedback & Improvement Loop</span>
                            </Button>
                        </div>
                    }
                />
            </div>

            {/* Investigation Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-100 border border-blue-200">
                        <Bubbles className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Investigation Objective</h3>
                </div>
                <div className="pl-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This analysis focuses on understanding systemic factors and learning opportunities. The goal is continuous improvement through structured investigation, not individual accountability or blame assignment.
                    </p>
                </div>
            </div>
            
            {/* Ticket Overview Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                        <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 1: Ticket Overview</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Ticket Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* Ticket ID */}
                                <div className="flex items-start gap-3">
                                    <FileText className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">TICKET ID</p>
                                        <p className="text-sm font-semibold text-blue-600">{ticket.ticketId}</p>
                                    </div>
                                </div>

                                {/* KPI Reference */}
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">KPI REFERENCE</p>
                                        <p className="text-sm font-medium text-foreground">{ticket.relatedKPI}</p>
                                    </div>
                                </div>

                                {/* Sub-Process */}
                                <div className="flex items-start gap-3">
                                    <Building className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SUB-PROCESS</p>
                                        <p className="text-sm font-medium text-foreground">{ticket.subProcess}</p>
                                    </div>
                                </div>

                                {/* Severity */}
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SEVERITY</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                            ticket.severity === 'High' ? 'bg-red-100 text-red-800' :
                                            ticket.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {ticket.severity}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Date Raised */}
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">DATE RAISED</p>
                                        <p className="text-sm font-medium text-foreground">{ticket.dateRaised}</p>
                                    </div>
                                </div>

                                {/* Assigned To */}
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">ASSIGNED TO</p>
                                        <p className="text-sm font-medium text-foreground">{ticket.assignedTo}</p>
                                    </div>
                                </div>

                                {/* Current Status */}
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CURRENT STATUS</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                            ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                                            ticket.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Estimated Value at Risk */}
                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-4 w-4 text-blue-600 mt-1" />
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">ESTIMATED VALUE AT RISK</p>
                                        <p className="text-sm font-semibold text-red-600">{ticket.estCost}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Impact Description */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-start gap-3 mb-3">
                                <Info className="h-4 w-4 text-blue-600 mt-1" />
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">BUSINESS IMPACT DESCRIPTION</p>
                            </div>
                            <div className="pl-7">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.businessImpactDescription}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Ticket not found</p>
                    </div>
                )}
            </div>

            {/* Root Cause Analysis */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-100 border border-purple-200">
                        <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 2: Root Cause Analysis</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Root Cause Category */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="h-4 w-4 text-blue-600" />
                                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">ROOT CAUSE CATEGORY</p>
                            </div>
                            <p className="text-lg font-semibold text-blue-800 ml-7">{ticket.rootCause.rootCauseCategory}</p>
                        </div>

                        {/* Detailed Root Cause Narrative */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="h-4 w-4 text-purple-600" />
                                <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">DETAILED ROOT CAUSE NARRATIVE</p>
                            </div>
                            <div className="bg-white border border-purple-100 rounded-lg p-4 ml-7">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.rootCause.rootCauseDescription}
                                </p>
                            </div>
                        </div>

                        {/* Contributing Factors */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <List className="h-4 w-4 text-purple-600" />
                                <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">CONTRIBUTING FACTORS</p>
                            </div>
                            <div className="ml-7 space-y-3 bg-white p-4 rounded-lg">
                                {ticket.rootCause.contributingFactors.map((factor, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="shrink-0 w-6 h-6 bg-purple-100 border border-purple-200 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-medium text-purple-600">{index + 1}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                                            {factor}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Root cause data not available</p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-100 border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 3: Corrective & Preventive Actions</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Immediate Fix (Corrective Action) */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Wrench className="h-4 w-4 text-green-600" />
                                <p className="text-xs font-medium text-green-600 uppercase tracking-wide">IMMEDIATE FIX (CORRECTIVE ACTION)</p>
                            </div>
                            <div className="bg-green-100 border border-green-200 rounded-lg p-4 ml-7">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.actions.correctiveAction}
                                </p>
                            </div>
                        </div>

                        {/* Preventive Action (Long-term Solution) */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-4 w-4 text-green-600" />
                                <p className="text-xs font-medium text-green-600 uppercase tracking-wide">PREVENTIVE ACTION (LONG-TERM SOLUTION)</p>
                            </div>
                            <div className="bg-white border border-green-200 rounded-lg p-4 ml-7">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.actions.preventiveAction}
                                </p>
                            </div>
                        </div>

                        {/* Control Enhancement Required */}
                        <div className="bg-white border border-green-200 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Control Enhancement Required */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">CONTROL ENHANCEMENT REQUIRED</p>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">
                                        {ticket.actions.controlEnhancement.isRequired ? 'Yes' : 'No'}
                                    </p>
                                    {ticket.actions.controlEnhancement.isRequired && (
                                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                                            <p className="text-xs text-green-700 leading-relaxed">
                                                {ticket.actions.controlEnhancement.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Owner */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <UserCheck className="h-4 w-4 text-green-600" />
                                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">ACTION OWNER</p>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">
                                        {ticket.approval.approver} ({ticket.approval.approverDesignation})
                                    </p>
                                </div>

                                {/* Target Closure Date */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-green-600" />
                                        <p className="text-xs font-medium text-green-600 uppercase tracking-wide">TARGET CLOSURE DATE</p>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">
                                        {ticket.dueDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Actions data not available</p>
                    </div>
                )}
            </div>

            {/* Approval */}
            <div>
                
            </div>
        </div>
    )
}

export default DeviationTicketDetails