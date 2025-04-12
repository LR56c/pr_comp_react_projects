import { FC, useEffect, useState } from "react"
import { useProjects }             from "../hooks/use_projects.ts"
import { ProjectCard }             from "./project_card.tsx"

export const ProjectsList: FC = () => {
  const proj                      = useProjects()
  const [isLoading, setIsLoading] = useState( true )
  useEffect( () => {
    const fetchData = async () => {
      try {
        await proj.getProjects()
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

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        { !isLoading && proj.projects.length === 0 ? (
          <p className="text-gray-500">No hay proyectos</p>
        ) : null }
        { !isLoading && proj.projects.length > 0 ? (
          <div className="w-full max-w-2xl">
            { proj.projects.map( ( project ) => (
              <ProjectCard onDelete={id => proj.removeProject(id)} key={project.name} project={ project }></ProjectCard>
            ) ) }
          </div>
        ) : null }
        { isLoading ? (
          <div className="flex justify-center items-center">Cargando...</div>
        ) : null }
      </div>
    </>
  )
}
