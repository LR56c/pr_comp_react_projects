import { FC } from "react"
import { Project } from "../modules/domain/project.ts"
import { MdDeleteOutline } from "react-icons/md";
interface ProjectCardProps {
  project : Project
  onDelete: ( id: string ) => void
}

export const ProjectCard: FC<ProjectCardProps> = ({project, onDelete}) => {
  return (
    <div className="flex">
      <button onClick={() => onDelete(project.id)}
              className="bg-red-300 rounded p-1">
        <MdDeleteOutline className="text-white" />
      </button>
      <div className="flex flex-col">
        <span>{project.name}</span>
        <span>{project.description}</span>
      </div>
      <div className="flex flex-col">
        <span>{project.userName}</span>
        <span>{project.createdAt.toString()}</span>
      </div>
    </div>
  )
}
