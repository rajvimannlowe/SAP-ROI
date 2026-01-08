import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Bubbles, FileText, TrendingUp, Building, AlertTriangle, Calendar, User, Clock, DollarSign, Info } from "lucide-react"
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
        </div>
    )
}

export default DeviationTicketDetails