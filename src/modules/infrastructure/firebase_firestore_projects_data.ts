import { ProjectsRepository }        from "../domain/projects_repository.ts"
import { Project }                   from "../domain/project.ts"
import { firebase }                  from "../../../firebase.ts"
import {
  addDoc,
  collection,
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
      await addDoc( this.db, project )
      return true
    }
    catch ( e ) {
      console.log( "Error creating project", e )
      return false
    }
  }

  async delete( id: string ): Promise<boolean> {
    try {
      const q             = query( this.db, where( "id", "==", id ) )
      const querySnapshot = await getDocs( q )
      console.log("querySnapshot", querySnapshot)
      if ( !querySnapshot.empty ) {
        querySnapshot.forEach( ( docSnapshot ) => {
          deleteDoc( docSnapshot.ref )
        } )
        return true
      }
      return false
    }
    catch ( e ) {
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
      return []
    }
  }

}
