import { ButtonSuccess } from "../../components/buttons/Button"
import { Input } from "rsuite"

export default function PageLogin() {
    return (
        <div className="h-screen w-screen flex p-28 bg-zinc-100">
            <div className="w-4/6 bg-white">
                <img className="w-full h-full object-cover" src="/image/Login-bro.png" alt="" />
            </div>
            <div className="flex-1 bg-neutral-50 flex items-center justify-center w-full">
                <div className="flex flex-col gap-y-5 w-full">
                    <div className="flex justify-center">
                        <p className="select-none tracking-widest text-blue-950 text-3xl font-semibold">Login</p>
                    </div>
                    <div className="flex flex-col gap-5 px-10">
                        <Input placeholder="Usuario" type="text" />
                        <Input placeholder="Senha" type="password" />
                        <ButtonSuccess>Entrar</ButtonSuccess>
                    </div>
                </div>
            </div>
        </div>
    )
}