import {
    DataGrid,
    GridToolbar
} from '@mui/x-data-grid';
import { ModalSuite } from '../../../components/modal/ModalSuite';
import { Columns } from './Columns';
import { getAllProducts } from '../../../services/products/getAllProducts';
import AddNewProduct from './AddNewProduct';
import { useQuery } from '@tanstack/react-query';

export function ControlProduct() {

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['rawDataProduct'],
        queryFn: async () => {
            const response = await getAllProducts()
            return response
        }
    })

    const updateGridControlProduct = (update: boolean): void => {
        if (update) {
            refetch()
        }
    }

    return (
        <>
            <div className='mx-10 mt-2 flex justify-end mb-2'>
                <ModalSuite
                    modalTitle='Adicionar Novo Produto'
                    buttonName='Adicionar Produto'
                    sizeModal='sm'
                    body={<AddNewProduct
                        updateGridControlProduct={updateGridControlProduct}
                    />}
                />
            </div>
            <DataGrid
                disableRowSelectionOnClick={true}
                loading={isLoading}
                rowSelection={false}
                disableDensitySelector={true}
                density={"compact"}
                columns={Columns({ updateGridControlProduct })}
                rows={data || []}
                disableColumnFilter
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                className='mx-10 shadow-md mb-10'
            />
        </>
    )
}