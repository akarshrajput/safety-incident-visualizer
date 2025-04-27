
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncidentForm } from "@/components/incident-form";
import { IncidentListItem } from "@/components/incident-list-item";
import { Incident, Severity, SortOrder, mockIncidents } from "@/types/incident";
import { useState } from "react";

export default function Index() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "All">("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredAndSortedIncidents = incidents
    .filter((incident) =>
      selectedSeverity === "All" ? true : incident.severity === selectedSeverity
    )
    .sort((a, b) => {
      const dateA = new Date(a.reportedAt).getTime();
      const dateB = new Date(b.reportedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const handleNewIncident = (
    newIncident: Omit<Incident, "id" | "reportedAt">
  ) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map((i) => i.id)) + 1,
      reportedAt: new Date().toISOString(),
    };
    setIncidents([...incidents, incident]);
  };

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">AI Safety Incident Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-48">
            <Select
              value={selectedSeverity}
              onValueChange={(value) => setSelectedSeverity(value as Severity | "All")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as SortOrder)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredAndSortedIncidents.map((incident) => (
              <IncidentListItem key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <IncidentForm onSubmit={handleNewIncident} />
        </div>
      </div>
    </div>
  );
}
