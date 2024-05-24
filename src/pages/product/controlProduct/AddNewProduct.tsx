
import { instanceAxios } from '../../../services/axios/axios';
import {
    Input,
    SelectPicker,
    useToaster,
    Message
} from "rsuite"
import {
    FormEvent
} from 'react';
import { ButtonSuccess } from '../../../components/buttons/Button';
import { getAllSupplier } from '../../../services/supplier/getAllSupplier';
import { useQuery } from '@tanstack/react-query';

interface PropsAddNewProduct {
    updateGridControlProduct?: (update: boolean) => void
}

export default function AddNewProduct({
    updateGridControlProduct
}: PropsAddNewProduct) {

    const message = (<></>)
    const toaster = useToaster()

    const { data } = useQuery({
        queryKey: ['rawDataNewProduct'],
        queryFn: async () => {
            const response = await getAllSupplier()
            return response
        }
    })

    const modalBodyNewProduct = (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex gap-x-3'>
                <Input name='name_product' placeholder='Produto' required={true} />
                <Input name='qty_stock' type='number' placeholder='Estoque' required={true} />
                <SelectPicker name='id_supplier' label={"Fornecedor"} placeholder={"Selecione"} data={data} />
            </div>
            <div className='mt-3'>
                <ButtonSuccess className='w-full'>
                    Enviar
                </ButtonSuccess>
            </div>
        </form>
    )

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const frm = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(frm)
            await instanceAxios.post("/products", data)
            const message = (
                <Message showIcon type={"success"} closable>
                    Produto Cadastrado
                </Message>
            );
            toaster.push(message, { placement: "topEnd", duration: 3000 })

            if (updateGridControlProduct) {
                updateGridControlProduct(true)
            }

        } catch (error: any) {
            const message = (
                <Message showIcon type={"error"} closable>
                    {error.response.data.message}
                </Message>
            );
            toaster.push(message, { placement: "topEnd", duration: 3000 })
            console.log(error.response.data.message)
        }
    }
    return (
        <div>
            {message}
            {modalBodyNewProduct}
        </div>
    )
}