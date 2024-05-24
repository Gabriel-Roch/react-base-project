
import { Outlet } from "react-router-dom"
import { useLinkClickHandler } from "react-router-dom"
import { User } from "lucide-react"

export default function App() {

  return (
    <div className="w-screen flex h-screen flex-col">
      <nav className="bg-blue-950 h-14 flex items-center justify-between">

        <div className="flex items-center gap-5">
          <p className="select-none text-white text-2xl tracking-widest mx-10 hover:cursor-pointer" onClick={useLinkClickHandler("/")} >PDV</p>
          <ul className="flex gap-3 text-white">
            <li
              onClick={useLinkClickHandler("/product")}
              className="select-none hover:cursor-pointer hover:text-slate-400">
              Produtos
            </li>
            <li onClick={useLinkClickHandler("/product/supplier")}
              className="select-none hover:cursor-pointer hover:text-slate-400">
              Fornecedores
            </li>
            <li onClick={useLinkClickHandler("/sale")}
              className="select-none hover:cursor-pointer hover:text-slate-400">
              Caixa
            </li>
          </ul>
        </div>

        <div className="mx-10 flex gap-3 items-center">
          <span>
            <User size={20} color="#ffffff" strokeWidth={1.75} />
          </span>
          <p className="text-base select-none text-white">GABRIEL ROCHA PINHEIRO</p>
        </div>

      </nav>
      <Outlet />
    </div>
  )

}
