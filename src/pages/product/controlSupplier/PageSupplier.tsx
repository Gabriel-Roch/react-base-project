import {
    DataGrid,
    GridToolbar
} from '@mui/x-data-grid';
import {
    FormEvent
} from 'react';
import { instanceAxios } from '../../../services/axios/axios';
import { ModalSuite } from '../../../components/modal/ModalSuite';
import {
    Input,
    MaskedInput,
    useToaster,
    Message
} from 'rsuite';
import { ButtonSuccess } from '../../../components/buttons/Button';
import { useQuery } from '@tanstack/react-query';
import { columns } from "./Columns"


export function ControlSupplier() {

    const mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const message = (<></>)
    const toaster = useToaster()

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['rawData'],
        queryFn: async () => {
            const response = await instanceAxios.get("/supplier")
            return response.data
        }
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const form = e.target
            const frm = new FormData(form as HTMLFormElement)
            const data = Object.fromEntries(frm)
            await instanceAxios.post("/supplier", data)
            const message = (
                <Message showIcon type={"success"} closable>
                    Fornecedor registrado!
                </Message>
            );
            toaster.push(message, { placement: "topEnd", duration: 3000 })
            refetch()
        } catch (error: any) {
            const message = (
                <Message showIcon type={"error"} closable>
                    {error.response.data.message}
                </Message>
            );
            toaster.push(message, { placement: "topEnd", duration: 3000 })
            console.log(error.response.data.message)
        }

    };

    const ModalBodyAddNewSupplier = (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='flex gap-x-3'>
                <Input name="name" placeholder="Fornecedor" required={true} />
                <MaskedInput
                    name="contact"
                    mask={mask}
                    placeholder="(__) ____-____"
                    guide={true}
                    required={true}
                />
            </div >
            <div className='mt-3 flex justify-center'>
                <ButtonSuccess className='w-screen'>
                    Adicionar
                </ButtonSuccess>
            </div>
        </form>
    )

    return (
        <>
            {message}
            <div className='mx-10 mt-2 flex justify-end mb-2'>
                <ModalSuite
                    body={ModalBodyAddNewSupplier}
                    sizeModal='sm'
                    buttonName="Adicionar Fornecedor"
                    modalTitle='Adicionar Novo Fornecedor'
                />
            </div>
            <DataGrid
                loading={isLoading}
                disableDensitySelector={true}
                density={"compact"}
                columns={columns}
                rows={data || []}
                disableColumnFilter
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                className='mx-10 shadow-md mb-10'
            />
        </>
    )
}