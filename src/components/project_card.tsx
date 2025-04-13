import { FC } from "react"
import { Project } from "../modules/domain/project.ts"
import { MdDeleteOutline } from "react-icons/md";
interface ProjectCardProps {
  project : Project
  onDelete: ( project : Project ) => void
}

const formatDate = ( date: string ) => {
  let options: Intl.DateTimeFormatOptions = {
        day: "numeric", month: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    };
    
    const validDate = new Date(date)
    return validDate.toLocaleDateString('es-ES', options)
}

export const ProjectCard: FC<ProjectCardProps> = ({project, onDelete}) => {
  return (
    <div className="flex flex-col border border-slate-200 rounded-xl p-4 w-full">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{project.name}</span>
      <button onClick={() => onDelete(project)}
              className="cursor-pointer flex items-center justify-center bg-red-300 rounded p-1 w-8 h-8">
        <MdDeleteOutline className="text-white" />
      </button>
      </div>
        <span>{project.description}</span>
        <span className="line-clamp-1">Por: {project.userName}</span>
        <span className="text-slate-400">Creado: {formatDate(project.createdAt)}</span>
    </div>
  )
}
