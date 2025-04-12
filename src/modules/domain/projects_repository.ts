import { Project } from "./project.ts"

export abstract class ProjectsRepository {
  abstract getAll(): Promise<Project[]>;
  abstract create(project: Project): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}
