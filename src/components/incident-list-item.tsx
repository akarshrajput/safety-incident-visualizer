
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Incident } from "@/types/incident";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { SeverityBadge } from "./severity-badge";

interface IncidentListItemProps {
  incident: Incident;
}

export function IncidentListItem({ incident }: IncidentListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{incident.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <SeverityBadge severity={incident.severity} />
              <span>
                {format(new Date(incident.reportedAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isExpanded ? "Show less" : "Show more"}
            </span>
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4">
          <p className="text-sm text-muted-foreground">{incident.description}</p>
        </CardContent>
      )}
    </Card>
  );
}
