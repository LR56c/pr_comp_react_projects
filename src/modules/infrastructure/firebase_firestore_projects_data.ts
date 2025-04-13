import { ProjectsRepository }        from "../domain/projects_repository.ts"
import { Project }                   from "../domain/project.ts"
import { firebase }                  from "../../../firebase.ts"
import {
  addDoc,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where
}                             from "firebase/firestore"

export class FirebaseFirestoreProjectsData implements ProjectsRepository {
  private readonly db

  constructor() {
    this.db = collection( getFirestore( firebase ), "projects" )
  }

  async create( project: Project ): Promise<boolean> {
    try {
      const docRef = doc(this.db, `${project.name}-${project.id}` )
      await setDoc(docRef, project)
      return true
    }
    catch ( e ) {
      console.log( "Error creating project", e )
      return false
    }
  }

  async delete( project: Project ): Promise<boolean> {
    try {
      const docRef = doc(this.db, `${project.name}-${project.id}` )
          await deleteDoc( docRef)
        return true

    }
    catch ( e ) {
      console.log( "Error deleting project", e )
      return false
    }
  }

  async getAll(): Promise<Project[]> {
    try {

      const projects: Project[] = []
      const query               = await getDocs( this.db )
      query.forEach( result => {
        projects.push( result.data() as Project )
      } )
      return projects
    }
    catch ( e ) {
      console.log( "Error getting projects", e )
      return []
    }
  }

}
