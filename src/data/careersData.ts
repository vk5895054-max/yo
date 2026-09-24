export interface JobPosition {
  id: string;
  _id?: string;
  slug: string;
  title: string;
  department: string;
  departmentTrack?: string;
  departmentKey: "frontend" | "ai" | "cloud" | "mobile" | "design";
  locationBadge: string;
  levelBadge: string;
  seniorityLevel?: string;
  salary: string;
  compensation?: string;
  techStack: string[];
  shortSummary: string;
  aboutRole: string;
  responsibilities: string[];
  keyResponsibilities?: string[];
  requirements: string[];
  mustHaveRequirements?: string[];
  niceToHave: string[];
  niceToHaveQualifications?: string[];
  benefits: string[];
  status?: string;
}

export const JOB_POSITIONS: JobPosition[] = [];
