import { useState, useMemo } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { DrilldownTable } from "@/components/roi/DrilldownTable"
import { FileText, AlertTriangle, Clock, RotateCcw } from "lucide-react"
import { deviationTicketColumns } from "@/data/ticketDeviationTableConfig.tsx"
import { deviationTicketData } from "@/data/ticketDeviationData"
import { SearchAndFilters } from "@/components/roi/SearchAndFilters"
import { MetricCard } from "@/components/roi/cards/MetricCard"

const deviationTicketSummaryCards = [
    {
        id: 1,
        icon: FileText,
        title: "OPEN TICKETS",
        subtitle: "Requiring immediate attention",
        value: "4",
        color: "#059669",
        backgroundColor: "#dcf7ef"
    },
    {
        id: 2,
        icon: AlertTriangle,
        title: "HIGH-SEVERITY TICKETS",
        subtitle: "Critical control failures",
        value: "2",
        color: "red",
        backgroundColor: "#FEF2F2"
    },
    {
        id: 3,
        icon: Clock,
        title: "AVG RESOLUTION TIME",
        subtitle: "Days to close ticket",
        value: "6.8",
        color: "blue",
        backgroundColor: "#EBF4FF"
    },
    {
        id: 4,
        icon: RotateCcw,
        title: "REPEAT DEVIATIONS",
        subtitle: "Recurring control issues",
        value: "2",
        color: "#9909e0",
        backgroundColor: "#f9e7ff"
    }
]

const DeviationTickets = () => {
    // Search and filter state
    const [searchValue, setSearchValue] = useState("")
    const [selectedSeverity, setSelectedSeverity] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")

    // Filter options
    const severityOptions = [
        { value: "", label: "All Severities" },
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" }
    ]

    const statusOptions = [
        { value: "", label: "All Statuses" },
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Closed", label: "Closed" }
    ]

    // Clear all filters
    const clearFilters = () => {
        setSearchValue("")
        setSelectedSeverity("")
        setSelectedStatus("")
    }

    // Count active filters
    const activeFiltersCount = useMemo(() => {
        let count = 0
        if (selectedSeverity) count++
        if (selectedStatus) count++
        return count
    }, [selectedSeverity, selectedStatus])

    // Filter data based on search and filters
    const filteredData = useMemo(() => {
        return deviationTicketData.filter((ticket) => {
            // Search filter
            const searchMatch = !searchValue || 
                ticket.ticketId.toLowerCase().includes(searchValue.toLowerCase()) ||
                ticket.relatedKPI.toLowerCase().includes(searchValue.toLowerCase()) ||
                ticket.subProcess.toLowerCase().includes(searchValue.toLowerCase()) ||
                ticket.deviationType.toLowerCase().includes(searchValue.toLowerCase()) ||
                ticket.assignedTo.toLowerCase().includes(searchValue.toLowerCase())

            // Severity filter
            const severityMatch = !selectedSeverity || ticket.severity === selectedSeverity

            // Status filter
            const statusMatch = !selectedStatus || ticket.status === selectedStatus

            return searchMatch && severityMatch && statusMatch
        })
    }, [searchValue, selectedSeverity, selectedStatus])

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header Section */}
            <div>
                <PageHeader
                    title={"Control Failure & ROI Leakage Governance"}
                    subtitle={"SAP FI – ROI Deviation & Ticketing Hub"}
                    backTo="/phase-i/catalog/sap-s4hana/blueprint/fi/cockpit/duplicate-payment-detection"
                    backLabel="Back to Action Tracker"
                    rightContent={""}
                />
            </div>

            {/* Deviation Ticket Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deviationTicketSummaryCards.map((card) => (
                    <MetricCard
                        key={card.id}
                        icon={card.icon}
                        value={card.value}
                        title={card.title}
                        description={card.subtitle}
                        color={card.color}
                        showStatusDot={false}
                        backgroundColor={card.backgroundColor}
                    />
                ))}
            </div>
            
            {/* Deviation Ticket Search and Filters Section */}
            <div>
                <SearchAndFilters
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchPlaceholder="Search ticket ID, KPI, process, or assignee..."
                    filters={[
                        {
                            label: "Severity",
                            value: selectedSeverity,
                            options: severityOptions,
                            onChange: setSelectedSeverity,
                            placeholder: "All Severities",
                        },
                        {
                            label: "Status",
                            value: selectedStatus,
                            options: statusOptions,
                            onChange: setSelectedStatus,
                            placeholder: "All Statuses",
                        },
                    ]}
                    onClearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                />
            </div>

            {/* Deviation Ticket Table Section */}
            <div>
                <DrilldownTable
                    columns={deviationTicketColumns}
                    data={filteredData}
                    title="Deviation Tickets"
                    subtitle="Control failures and ROI leakage incidents requiring attention"
                    emptyMessage="No deviation tickets found"
                    emptyDescription="All control processes are operating within acceptable parameters"
                    accentColor="#059669"
                />
            </div>
        </div>
    )
}

export default DeviationTickets