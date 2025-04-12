import { useState } from "react"
import { Project }  from "../modules/domain/project.ts"
import axios        from "axios"
import {
  FirebaseFirestoreProjectsData
}                   from "../modules/infrastructure/firebase_firestore_projects_data.ts"
import {
  FirebaseFunctionsProjectsData
}                   from "../modules/infrastructure/firebase_functions_projects_data.ts"

export function useProjects() {
  const firestoreRepo           = new FirebaseFirestoreProjectsData()
  const functionsRepo           = new FirebaseFunctionsProjectsData()
  const [projects, setProjects] = useState<Project[]>( [] )
  const addProject              = async ( name: string,
    description: string ) => {
    const randomNumber = Math.floor( Math.random() * 200 )
    const jsonResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${ randomNumber }` )
    if ( jsonResponse.status !== 200 ) {
      return false
    }
    const json             = jsonResponse.data
    const id               = json.id
    const userId           = json.userId
    const userName         = json.title
    const project: Project = {
      name,
      description,
      createdAt: new Date(),
      userName,
      userId,
      id
    }
    return await firestoreRepo.create( project )
  }

  const getProjects = async () => {
    const projects = await firestoreRepo.getAll()
    console.log( "projects", projects )
    setProjects( projects )
  }

  const removeProject = async ( id: string ) => {
    // const result = await functionsRepo.delete( id )
    const result = await firestoreRepo.delete( id )
    if ( result ) {
      setProjects( projects.filter( project => project.id !== id ) )
    }
  }

  return { projects, addProject, getProjects, removeProject }
}
