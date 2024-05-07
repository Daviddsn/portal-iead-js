import editPost from "../../assets/editPost.svg"
import editUser from "../../assets/editUser.svg"
import listPost from "../../assets/listPost.svg"
import listUser from "../../assets/listUser.svg"
import newPost from "../../assets/newPost.svg"
import newUser from "../../assets/newUser.svg"
import { Button } from "../ui/button"

export function Sidebar() {
  return (
    <div className="bg-blue-bg">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Post
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <img src={newPost} className="mr-2 h-4 w-4"/>
              Novo post
            </Button>
            <Button variant="ghost" className="w-full justify-start">
             <img src={editPost} className="mr-2 h-4 w-4"/>
              Editar post
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <img src={listPost} className="mr-2 h-4 w-4"/>
              Listagem de post
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Usuários
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
            <img src={newUser} className="mr-2 h-4 w-4"/>
              Criar usuário
            </Button>
            <Button variant="ghost" className="w-full justify-start">
            <img src={editUser} className="mr-2 h-4 w-4"/>
              Editar usuário
            </Button>
            <Button variant="ghost" className="w-full justify-start">
            <img src={listUser} className="mr-2 h-4 w-4"/>
              Listagem de usuário
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}