import { log } from 'fp-ts/lib/Console';
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
    const id               = json.id.toString()
    const userId           = json.userId.toString()
    const userName         = json.title
    const project: Project = {
      name,
      description,
      createdAt: new Date().toISOString(),
      userName,
      userId,
      id
    }

    return await firestoreRepo.create( project )
  }

  const getProjects = async () => {
    const projects = await firestoreRepo.getAll()
    setProjects( projects )
  }

  const removeProject = async ( project : Project ) => {
    const result = await functionsRepo.delete( project )
    // const result = await firestoreRepo.delete( project )
    if ( result ) {
      setProjects( projects.filter( p => p.id !== project.id ) )
    }
  }

  return { projects, addProject, getProjects, removeProject }
}
