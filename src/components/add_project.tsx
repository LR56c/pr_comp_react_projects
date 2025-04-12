import { FC, useState }  from "react"
import { useValidation } from "react-simple-form-validator"
import { useProjects }   from "../hooks/use_projects.ts"

const parseRuleMessage      = ( rule: string ) => {
  switch ( rule ) {
    case "required":
      return "Este campo es obligatorio"
    case "minlength":
      return "El campo debe tener al menos 10 caracteres"
    default:
      return ""
  }
}
export const AddProject: FC = () => {
  const [name, setName]               = useState( "" )
  const [description, setDescription] = useState( "" )
  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const projects                      = useProjects()

  const { isFormValid, getFailedRulesInField } = useValidation( {
    fieldsRules: {
      name       : { required: true },
      description: { required: true, minlength: 10 }
    },
    state      : { name, description }
  } )

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !isFormValid ) {
      return
    }
    setIsloading( true )
    const result = await projects.addProject( name, description )
    setIsloading( false )
    if(!result){
      alert("Error al crear el proyecto. Intente nuevamente")
      return
    }
    alert( "Proyecto creado exitosamente!" )
    setName( "" )
    setDescription( "" )
    setIsTouched(false)
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={ handleSubmit }>
      <div className="flex flex-col">
        <label htmlFor="name"
               className="block mb-2 text-sm font-medium text-gray-900">Nombre
          del proyecto:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ name }
          onChange={ ( e ) => {
            setName( e.target.value )
            setIsTouched(true)
          } }
        />
        { isTouched ? getFailedRulesInField( "name" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null }
      </div>
      <div className="flex flex-col">
        <label htmlFor="descripcion"
               className="block mb-2 text-sm font-medium text-gray-900">Descripcion</label>
        <textarea
          cols={ 4 }
          name="descripcion"
          id="descripcion"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ description }
          onChange={ ( e ) => {
            setDescription( e.target.value )
            setIsTouched(true)
          }}
        />
        { isTouched ? getFailedRulesInField( "description" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null}
      </div>
      <button disabled={isLoading} className="bg-slate-300 font-medium rounded py-3 px-6 cursor-pointer"
              type="submit">Enviar
      </button>
    </form>
  )
}
