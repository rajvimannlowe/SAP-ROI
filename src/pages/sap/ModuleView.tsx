import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { SAP_MODULES } from '../../data/mockData';
import { ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { MOCK_DD_ITEMS } from '../../data/mockData';

export function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = SAP_MODULES.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  // Count DD items per sub-module
  const subModuleStats = module.subModules.map((subModule) => {
    const itemCount = MOCK_DD_ITEMS.filter((item) => item.subModuleId === subModule.id).length;
    return { ...subModule, itemCount };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {module.code} - {module.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a sub-module to view Due Diligence items
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subModuleStats.map((subModule) => (
          <Card key={subModule.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{subModule.code}</CardTitle>
                    <CardDescription>{subModule.name}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {subModule.itemCount} DD Item{subModule.itemCount !== 1 ? 's' : ''}
                </span>
              </div>
              <Link to={`/sap/${moduleId}/${subModule.id}`}>
                <Button className="w-full" variant="outline">
                  View Due Diligence
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

