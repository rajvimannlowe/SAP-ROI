import { useNavigate, useParams } from "react-router-dom";
import { ProductBlueprint } from "../../../../../../data/productBlueprintData";
import { SectionHeader } from "./SectionHeader";

interface ModulesSectionProps {
  subModules: ProductBlueprint["subModules"];
  activeModuleId?: string;
  onModuleClick?: (moduleId: string) => void;
  blueprintId?: string;
}

export function ModulesSection({
  subModules,
  activeModuleId,
  onModuleClick,
  blueprintId: propBlueprintId,
}: ModulesSectionProps) {
  const navigate = useNavigate();
  const { id: routeBlueprintId } = useParams<{ id: string }>();
  const blueprintId = propBlueprintId || routeBlueprintId;

  const handleModuleClick = (moduleId: string) => {
    onModuleClick?.(moduleId);
    // Don't navigate directly - let parent handle showing flow selection
  };

  return (
    <div className="space-y-5 animate-in fade-in-50 duration-300">
      <SectionHeader
        title="Modules"
        subtitle="Select a module to view detailed ROI cockpit and metrics"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {subModules.map((module) => {
          const isActive = module.id === activeModuleId;
          return (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`group relative overflow-hidden rounded-xl border border-border/50 bg-card shadow-md hover:shadow-xl transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-[#4160F0]/30 border-[#4160F0]/50"
                  : "hover:border-[#4160F0]/40"
              }`}
            >
              <div className="p-3">
                <div
                  className={`rounded-lg p-3.5 mb-2 shadow-sm border relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/60"
                      : "bg-gradient-to-br from-slate-50/50 to-blue-50/30 group-hover:from-blue-50/60 group-hover:to-indigo-50/40"
                  }`}
                  style={{
                    borderColor: isActive
                      ? "rgba(65, 96, 240, 0.3)"
                      : "rgba(148, 163, 184, 0.2)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold mb-2 transition-colors ${
                        isActive
                          ? "text-[#4160F0]"
                          : "text-foreground group-hover:text-[#4160F0]"
                      }`}
                    >
                      {module.name}
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground mb-2 leading-tight">
                      {module.label}
                    </div>
                    {module.phase && (
                      <div className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[9px] font-semibold border border-amber-200">
                        {module.phase}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#4160F0" : "#94a3b8",
                      boxShadow: isActive
                        ? "0 0 6px rgba(65, 96, 240, 0.5)"
                        : undefined,
                    }}
                  />
                  <span className="text-[9px] text-muted-foreground font-medium">
                    {isActive ? "Active" : "Available"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
