import { FormEvent } from 'react';
import {
    Input,
    SelectPicker,
    InputGroup,
    useToaster,
    Message
} from "rsuite"
import { ButtonSuccess } from '../../../components/buttons/Button';
import { getAllSupplier } from "../../../services/supplier/getAllSupplier";
import { instanceAxios } from '../../../services/axios/axios';
import { useQuery } from '@tanstack/react-query';

interface ProdEditProduct {
    name: string
    qtyStock: number
    purchasePrice: string
    salePrice: string
    idSupplier: string
    id_product: string
    updateGridControlProduct?: (update: boolean) => void
}

export default function EditProduct({
    idSupplier,
    name,
    purchasePrice,
    qtyStock,
    salePrice,
    id_product,
    updateGridControlProduct
}: ProdEditProduct) {

    const message = (<></>)
    const toaster = useToaster()

    const { data } = useQuery({
        queryKey: ['rawDataProductsEdit'],
        queryFn: async () => {
            const response = await getAllSupplier()
            return response
        }
    })

    const handleSubmitEditProduct = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const frm = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(frm)
            console.log("dados do edit produtos", data)

            await instanceAxios.put("/products", data)

            if (updateGridControlProduct) {
                updateGridControlProduct(true)
            }

            const message = (
                <Message showIcon type={"success"} closable>
                    Produto Cadastrado
                </Message>
            )
            toaster.push(message, { placement: "topEnd", duration: 3000 })

        } catch (error) {
            console.log(error)
            const message = (
                <Message showIcon type={"error"} closable>
                    Error ao Atualizar Produto
                </Message>
            )
            toaster.push(message, { placement: "topEnd", duration: 3000 })
        }
    }

    return (
        <div>
            {message}
            <form onSubmit={(e) => handleSubmitEditProduct(e)}>
                <div className='flex justify-center gap-x-3'>
                    <Input className='hidden' name="id_product" value={id_product} />
                    <Input name="p_name" defaultValue={name} />
                    <Input name="qty_stock" defaultValue={qtyStock} type="number" />
                    <InputGroup>
                        <InputGroup.Addon>Compra</InputGroup.Addon>
                        <Input name='purchase_price' className='text-green-700' defaultValue={purchasePrice} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>Venda</InputGroup.Addon>
                        <Input name="sale_price" className='text-red-700' defaultValue={salePrice} />
                    </InputGroup>
                    <SelectPicker name='id_supplier' label={"Fornecedor"} placeholder={"Selecione"} defaultValue={idSupplier} data={data} />
                </div>
                <div className='mt-3'>
                    <ButtonSuccess type='submit' className='w-full'>
                        Enviar
                    </ButtonSuccess>
                </div>
            </form>
        </div>
    )
}