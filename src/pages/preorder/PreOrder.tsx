import {
    useState,
    useEffect
} from 'react';
import { SelectPicker } from 'rsuite';
import { ModalSuite } from '../../components/modal/ModalSuite';
import { SearchProduct } from './SearchProducts';
import { useQuery } from '@tanstack/react-query';
import { instanceAxios } from '../../services/axios/axios';
import {
    useToaster,
    Message
} from "rsuite"

interface AddedItem {
    id: number;
    p_name: string;
    price: number;
    quantity: number;
}

export function PreOrder() {
    const [addedItems, setAddedItems] = useState<AddedItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [methodPayment, setMethodPayment] = useState("")
    const message = (<></>)
    const toaster = useToaster()

    const { data: dataMethods } = useQuery({
        queryKey: ['methods'],
        queryFn: async () => {
            const response = await instanceAxios.get("/paymentsMethods")
            return response.data
        }
    })

    useEffect(() => {
        const total = addedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [addedItems]);

    const handleFinishAddedProducts = async () => {
        try {
            if (addedItems.length == 0) {
                const message = (
                    <Message showIcon type={"warning"} closable>
                        Adicione Itens Para venda!
                    </Message>
                )
                toaster.push(message, { placement: "topEnd", duration: 3000 })
                return
            }
            if (methodPayment == "") {
                const message = (
                    <Message showIcon type={"warning"} closable>
                        Selecione um Metodo de Pagamento
                    </Message>
                )
                toaster.push(message, { placement: "topEnd", duration: 4000 })
                return
            }
            const response = await instanceAxios.post("/sale", {
                orders: addedItems,
                methodPayment: methodPayment
            })
            console.log(response.data)
            const message = (
                <Message showIcon type={"success"} closable>
                    Venda Realizada com Sucesso!
                </Message>
            )
            toaster.push(message, { placement: "topEnd", duration: 3000 })
            setAddedItems([])
            setTotalPrice(0)
            setMethodPayment("")
        } catch (error: any) {
            const message = (
                <Message showIcon type={"error"} closable>
                    Erro ao Realizar Venda
                </Message>
            )
            toaster.push(message, { placement: "topEnd", duration: 3000 })
            console.log(error)
        }
    };

    const handleCancel = () => {
        setAddedItems([])
        setTotalPrice(0)
        setMethodPayment("")
    }

    const handleAddItems = (items: AddedItem[]) => {
        setAddedItems(items);
    };

    return (
        <div className="h-screen w-screen flex flex-col p-10">
            <div className="h-16 bg-zinc-300 rounded-md flex flex-col justify-center items-start px-4">
                <p className="select-none">Etapa:</p>
                <p className="text-2xl text-black select-none">$ Pagamento</p>
            </div>
            <div className="flex-1 flex gap-x-5">
                <div className="w-6/12 h-full flex justify-center items-start">
                    <div className="w-full max-h-[400px] overflow-auto mt-12">
                        <div className="min-w-full bg-white border border-gray-300">
                            <table className="w-full">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-300">Id</th>
                                        <th className="py-2 px-4 border-b border-gray-300">Produto</th>
                                        <th className="py-2 px-4 border-b border-gray-300">Valor</th>
                                        <th className="py-2 px-4 border-b border-gray-300">Quantidade</th>
                                        <th className="py-2 px-4 border-b border-gray-300">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full h-full overflow-y-auto">
                                    {addedItems.map((item) => (
                                        <tr key={item.id}>
                                            <td align='center' className="py-2 px-4 border-b border-gray-300">{item.id}</td>
                                            <td align='center' className="py-2 px-4 border-b border-gray-300">{item.p_name}</td>
                                            <td align='center' className="py-2 px-4 border-b border-gray-300">{item.price}</td>
                                            <td align='center' className="py-2 px-4 border-b border-gray-300">{item.quantity}</td>
                                            <td align='center' className="py-2 px-4 border-b border-gray-300">{(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 h-full flex flex-col">
                    <p className="text-black text-2xl mt-3 select-none font-bold">Selecione a forma de Pagamento.</p>
                    <SelectPicker className="mt-3" data={dataMethods} value={methodPayment} searchable={false} block onChange={(value: any) => {
                        setMethodPayment(value)
                    }} />
                    <div className="flex justify-center my-5 flex-grow items-center flex-col">
                        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md select-none">
                            <span className="text-black text-4xl font-semibold">Total: R$ {totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div>
                        <ModalSuite
                            modalTitle="Adicionar Produto"
                            sizeModal="lg"
                            buttonClass="w-full mb-10 bg-blue-600 px-24 py-4 text-white rounded-md text-2xl hover:bg-blue-900 select-none"
                            buttonName="Iniciar Venda"
                            body={<SearchProduct onAddItems={handleAddItems} />}
                            visibleFooter={true}
                            backdrop={'static'}
                        />
                    </div>
                    <div className="flex gap-x-5 justify-between mt-auto">
                        <button className="bg-green-600 px-24 py-4 text-white rounded-md text-2xl hover:bg-green-900 select-none" onClick={handleFinishAddedProducts}>
                            Finalizar Venda
                        </button>
                        <button className="bg-red-600 px-24 py-4 text-white rounded-md text-2xl hover:bg-red-800 select-none" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
