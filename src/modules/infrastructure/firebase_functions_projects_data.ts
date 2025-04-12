import { ProjectsRepository } from "../domain/projects_repository.ts"
import { Project }            from "../domain/project.ts"

export class FirebaseFunctionsProjectsData implements ProjectsRepository {
  async create( project: Project ): Promise<boolean> {
  }

  async delete( id: string ): Promise<boolean> {
  }

  async getAll(): Promise<Project[]> {
    return []
  }

}
