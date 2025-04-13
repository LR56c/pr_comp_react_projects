import { FC, useEffect, useState } from "react"
import { useProjects }             from "../hooks/use_projects.ts"
import { ProjectCard }             from "./project_card.tsx"
import { Project }                 from "../modules/domain/project.ts"

export const ProjectsList: FC = () => {
  const { projects, getProjects, removeProject } = useProjects()

  const [isLoading, setIsLoading] = useState( true )
  useEffect( () => {
    const fetchData = async () => {
      try {
        await getProjects()
      }
      catch ( error ) {
        console.error( "Error fetching data:", error )
      }
      finally {
        setIsLoading( false )
      }
    }
    fetchData()
  }, [] )


  const handleDelete = async ( project: Project ) => {
    await removeProject( project )
  }

  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        { !isLoading && projects.length === 0 ? (
          <p className="text-gray-500">No hay proyectos</p>
        ) : null }
        { !isLoading && projects.length > 0 ? (
          <>
            { projects.map( ( project ) => (
              <ProjectCard onDelete={ p => handleDelete( p ) }
                           key={ project.name }
                           project={ project }></ProjectCard>
            ) ) }
          </>
        ) : null }
        { isLoading ? (
          <div className="flex justify-center items-center">Cargando...</div>
        ) : null }
      </div>
    </>
  )
}
