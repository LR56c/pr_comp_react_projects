import "./App.css"
import { AddProject }   from "./components/add_project.tsx"
import { ProjectsList } from "./components/projects_list.tsx"
import { useState }     from "react"

function App() {

  // const callFunction = async () => {
  //   console.log( "init" )
  //   const functions     = getFunctions( firebase )
  //   const removeMessage = httpsCallable( functions, "removeMessage" )
  //   const r             = await removeMessage( { messageId: 12 } )
  //   console.log( "post", r )
  // }
  // const testDatabase = async () => {
  //   const f = getFirestore(firebase)
  //   const r = collection( f, "projects" )
  //   const a = await addDoc( r, {
  //     abc: 1
  //   } )
  // }
  const [addProjectEnabled, setAddProjectEnabled] = useState( false )
  return (
    <>
      <div className="h-dvh flex p-4">
        <ProjectsList></ProjectsList>
        <div className="w-full gap-4 flex flex-col items-center">
          <button onClick={ () => setAddProjectEnabled( !addProjectEnabled ) }
                  className="bg-green-300 font-medium rounded py-3 px-6 cursor-pointer">Agregar
            Proyecto
          </button>
          { addProjectEnabled ? (
            <AddProject></AddProject>
          ) : null }
        </div>
      </div>
    </>
  )
}

export default App
