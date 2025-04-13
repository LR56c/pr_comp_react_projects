import { ProjectsRepository }          from "../domain/projects_repository.ts"
import { Project }                     from "../domain/project.ts"
import { getFunctions, httpsCallable } from "firebase/functions"
import { firebase }                    from "../../../firebase.ts"

export class FirebaseFunctionsProjectsData implements ProjectsRepository {
  async create( project: Project ): Promise<boolean> {
    return false
  }

  async delete( project: Project ): Promise<boolean> {
    try {
      const functions     = getFunctions( firebase )
      const removeMessage = httpsCallable( functions, "removeMessage" )
      await removeMessage( { name: project.name, id: project.id } )
      return true
    }
    catch ( e ) {
      return false
    }
  }

  async getAll(): Promise<Project[]> {
    return []
  }

}
