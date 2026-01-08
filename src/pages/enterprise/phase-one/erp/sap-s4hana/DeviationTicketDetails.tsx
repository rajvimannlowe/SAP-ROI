import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Bubbles, FileText, TrendingUp, Building, AlertTriangle, Calendar, User, Clock, DollarSign, Info, Target, BookOpen, List, CheckCircle, Wrench, Shield, UserCheck, ClipboardCheck, FileCheck, MessageSquare, Lightbulb, Link, Activity, History } from "lucide-react"
import { useParams } from "react-router-dom"
import { deviationTicketData } from "@/data/ticketDeviationData"
import { InfoCard } from "@/components/roi/cards/InfoCard"
import { BRAND_COLORS, hexToRgba } from "@/components/roi/cards/index"

const DeviationTicketDetails = () => {
    const { ticketId } = useParams<{ ticketId: string }>();

    const ticket = deviationTicketData.find(t => t.ticketId === ticketId);
    const pageTitle = ticket ? `${ticket.ticketId} - ${ticket.relatedKPI}` : ticketId || "Ticket Details";

    return (
        <div className="min-h-screen bg-gray-50/30">
            {/* Page Header Section */}
            <div className="mb-8">
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
            <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-6 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-100/80 border border-blue-200/60 shadow-sm">
                        <Bubbles className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Investigation Objective</h3>
                </div>
                <div className="pl-14">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This analysis focuses on understanding systemic factors and learning opportunities. The goal is continuous improvement through structured investigation, not individual accountability or blame assignment.
                    </p>
                </div>
            </div>

            {/* Ticket Overview Section */}
            <div className="bg-white border border-gray-200/60 rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-gray-100/80 border border-gray-200/60 shadow-sm">
                        <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 1: Ticket Overview</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Ticket Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {/* Left Column */}
                            <div className="space-y-6">
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
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${ticket.severity === 'High' ? 'bg-red-100/80 text-red-800 border border-red-200/60' :
                                            ticket.severity === 'Medium' ? 'bg-orange-100/80 text-orange-800 border border-orange-200/60' :
                                                'bg-green-100/80 text-green-800 border border-green-200/60'
                                            }`}>
                                            {ticket.severity}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
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
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${ticket.status === 'Open' ? 'bg-red-100/80 text-red-800 border border-red-200/60' :
                                            ticket.status === 'In Progress' ? 'bg-orange-100/80 text-orange-800 border border-orange-200/60' :
                                                'bg-green-100/80 text-green-800 border border-green-200/60'
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
                        <div className="border-t border-gray-200/60 pt-8">
                            <div className="flex items-start gap-3 mb-4">
                                <Info className="h-4 w-4 text-blue-600 mt-1" />
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">BUSINESS IMPACT DESCRIPTION</p>
                            </div>
                            <div className="pl-7 mt-2">
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
            <div className="bg-purple-50/80 border border-purple-200/60 rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-purple-100/80 border border-purple-200/60 shadow-sm">
                        <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 2: Root Cause Analysis</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Root Cause Category */}
                        <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-6 mb-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <Target className="h-4 w-4 text-blue-600" />
                                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">ROOT CAUSE CATEGORY</p>
                            </div>
                            <p className="text-xl font-semibold text-blue-800 ml-7">{ticket.rootCause.rootCauseCategory}</p>
                        </div>

                        {/* Detailed Root Cause Narrative */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen className="h-4 w-4 text-purple-600" />
                                <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">DETAILED ROOT CAUSE NARRATIVE</p>
                            </div>
                            <div className="bg-white border border-purple-100/60 rounded-xl p-6 ml-7 shadow-sm">
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
                            <div className="ml-7 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-purple-100/60">
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
            <div className="bg-green-50/80 border border-green-200/60 rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-green-100/80 border border-green-200/60 shadow-sm">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Section 3: Corrective & Preventive Actions</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Immediate Fix (Corrective Action) */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <Wrench className="h-4 w-4 text-green-600" />
                                <p className="text-xs font-medium text-green-600 uppercase tracking-wide">IMMEDIATE FIX (CORRECTIVE ACTION)</p>
                            </div>
                            <div className="bg-green-100/80 border border-green-200/60 rounded-xl p-6 ml-7 shadow-sm">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.actions.correctiveAction}
                                </p>
                            </div>
                        </div>

                        {/* Preventive Action (Long-term Solution) */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-4 w-4 text-green-600" />
                                <p className="text-xs font-medium text-green-600 uppercase tracking-wide">PREVENTIVE ACTION (LONG-TERM SOLUTION)</p>
                            </div>
                            <div className="bg-white border border-green-200/60 rounded-xl p-6 ml-7 shadow-sm">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.actions.preventiveAction}
                                </p>
                            </div>
                        </div>

                        {/* Control Enhancement Required */}
                        <div className="bg-white border border-green-200/60 rounded-xl p-6 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                        <div className="mt-3 p-4 bg-green-50/80 border border-green-200/60 rounded-lg shadow-sm">
                                            <p className="text-xs text-green-700 leading-relaxed">
                                                {ticket.actions.controlEnhancement.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-2">
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
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Actions data not available</p>
                    </div>
                )}
            </div>

            {/* Approval */}
            <div className="bg-orange-50/80 border border-orange-200/60 rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-orange-100/80 border border-orange-200/60 shadow-sm">
                        <ClipboardCheck className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Approval</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Approval Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Approval Required */}
                            <div className="bg-white border border-orange-200/60 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <FileCheck className="h-4 w-4 text-orange-600" />
                                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">APPROVAL REQUIRED</p>
                                </div>
                                <div className="ml-7">
                                    <p className="text-sm font-medium text-foreground">
                                        {ticket.approval.isRequired ? 'Yes' : 'No'}
                                    </p>
                                    {ticket.approval.isRequired && (
                                        <div className="mt-6">
                                            <p className="text-xs text-muted-foreground">Approver:</p>
                                            <p className="text-sm font-medium text-foreground">
                                                {ticket.approval.approver} ({ticket.approval.approverDesignation})
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Approval Status */}
                            <div className="bg-white border border-orange-200/60 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="h-4 w-4 text-orange-600" />
                                    <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">APPROVAL STATUS</p>
                                </div>
                                <div className="ml-7">
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${ticket.approval.approvalStatus === 'Approved' ? 'bg-green-100/80 text-green-800 border border-green-200/60' :
                                        ticket.approval.approvalStatus === 'Pending' ? 'bg-orange-100/80 text-orange-800 border border-orange-200/60' :
                                            'bg-red-100/80 text-red-800 border border-red-200/60'
                                        }`}>
                                        {ticket.approval.approvalStatus}
                                    </span>
                                    {ticket.approval.approvalDate && (
                                        <div className="mt-6">
                                            <p className="text-xs text-muted-foreground">Expected Date:</p>
                                            <p className="text-sm font-medium text-foreground">{ticket.approval.approvalDate}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Closure Notes */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="h-4 w-4 text-orange-600" />
                                <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">CLOSURE NOTES</p>
                            </div>
                            <div className="bg-white border border-orange-100/60 rounded-xl p-6 ml-7 shadow-sm">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ticket.approval.closureNotes}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Approval data not available</p>
                    </div>
                )}
            </div>
            
            {/* Learnings */}
            <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 rounded-xl bg-blue-100/80 border border-blue-200/60 shadow-sm">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Lessons Learned & Knowledge Transfer</h3>
                </div>

                {ticket ? (
                    <>
                        {/* Learning Description */}
                        <div className="bg-white border border-blue-100/60 rounded-xl p-6 mb-8 shadow-sm">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {ticket.learnings.learningDescription}
                            </p>
                        </div>

                        {/* Bottom Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Related Tickets */}
                            <div className="bg-white border border-blue-200/60 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Link className="h-4 w-4 text-blue-600" />
                                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">RELATED TICKETS</p>
                                </div>
                                <div className="ml-7 space-y-2">
                                    {ticket.learnings.relatedTickets.map((relatedTicket, index) => (
                                        <div key={index} className="inline-flex items-center px-3 py-1.5 bg-blue-100/80 text-blue-800 rounded-full text-xs font-medium border border-blue-200/60 shadow-sm mr-2 mb-2">
                                            {relatedTicket}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Audit Trail Activity */}
                            <div className="bg-white border border-blue-200/60 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Activity className="h-4 w-4 text-blue-600" />
                                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">AUDIT TRAIL ACTIVITY</p>
                                </div>
                                <div className="ml-7">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {ticket.auditTrail.trails.length}
                                        </span>
                                        <span className="text-sm text-muted-foreground">Logged events</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Learning data not available</p>
                    </div>
                )}
            </div>
            
            {/* Audit Trail */}
            <div className="bg-linear-to-br from-slate-50 to-gray-50/50 border border-slate-200/70 rounded-2xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg">
                        <History className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Audit Trail</h3>
                        <p className="text-sm text-slate-600 mt-1">Track all changes and activities</p>
                    </div>
                </div>

                {ticket ? (
                    <div className="relative">
                        {/* Enhanced Timeline Line */}
                        <div className="absolute left-7 top-0 bottom-0 w-1 bg-linear-to-b from-emerald-400 via-teal-400 to-slate-300/60 rounded-full shadow-sm"></div>
                        
                        <div className="space-y-8">
                            {ticket.auditTrail.trails.map((trail, index) => (
                                <div key={index} className="relative group">
                                    {/* Enhanced Timeline Node */}
                                    <div className="absolute left-5 top-5 w-6 h-6 bg-white border-3 border-emerald-400 rounded-full shadow-lg z-10 group-hover:scale-110 transition-transform duration-200">
                                        <div className="absolute inset-1.5 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full"></div>
                                    </div>
                                    
                                    {/* Enhanced Content Card */}
                                    <div className="ml-16 bg-white/80 backdrop-blur-sm border border-slate-200/70 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-emerald-300/60 hover:bg-white group-hover:translate-x-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-teal-100 border border-emerald-200/60 rounded-xl flex items-center justify-center shadow-sm">
                                                    <span className="text-sm font-bold text-emerald-700">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-slate-800">{trail.user}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                                        <p className="text-sm text-slate-600">{trail.timestamp}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="ml-14 pl-5 border-l-3 border-gradient-to-b from-emerald-200 to-teal-200 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-400 to-teal-400 rounded-full"></div>
                                            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-linear-to-r from-slate-50 to-emerald-50/30 p-4 rounded-xl border border-slate-200/50">
                                                {trail.action}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-gray-100 border border-slate-200/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <History className="h-10 w-10 text-slate-500" />
                        </div>
                        <p className="text-slate-700 font-bold text-lg mb-2">Audit trail data not available</p>
                        <p className="text-sm text-slate-500">No activity records found for this ticket</p>
                    </div>
                )}
            </div>

            {/* Learning-Oriented Investigation Framework */}
            <div className="mb-8">
                <InfoCard
                    icon={BookOpen}
                    iconGradient="linear-gradient(135deg, #4160F0 0%, #6366F1 100%)"
                    title="Learning-Oriented Investigation Framework"
                    description={
                        <div className="space-y-3">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                This structured investigation approach prioritizes organizational learning over individual accountability. By documenting root causes, contributing factors, and preventive actions, we build institutional knowledge and strengthen controls systematically.
                            </p>
                        </div>
                    }
                    borderColor={hexToRgba(BRAND_COLORS.PRIMARY, 0.3)}
                    bgColor={hexToRgba(BRAND_COLORS.PRIMARY, 0.08)}
                />
            </div>
        </div>
    )
}

export default DeviationTicketDetails