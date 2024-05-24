import {
    DataGrid,
    GridToolbar,
    GridColDef
} from '@mui/x-data-grid';
import { instanceAxios } from '../../../services/axios/axios';
import { useQuery } from '@tanstack/react-query';

interface PropsModalPrice {
    id: string
    updateGridControlProduct?: (update: boolean) => void
}

export default function Price({ id,
    updateGridControlProduct
}: PropsModalPrice) {

    const { data, isLoading } = useQuery({
        queryKey: ['rawDataPrice'],
        queryFn: async () => {
            const response = await instanceAxios.get("/products/price?id_product=" + id)
            return response.data
        }
    })

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'purchase_price', headerName: 'Valor Compra', cellClassName: "text-red-600" },
        { field: 'sale_price', headerName: 'Valor Venda', cellClassName: "text-green-600" },
        { field: 'price_active', headerName: 'Status' },
        { field: 'dt_insert', headerName: 'Data' }
    ]

    return (
        <div className='h-96'>
            <DataGrid
                disableRowSelectionOnClick={true}
                loading={isLoading}
                rowSelection={false}
                disableDensitySelector={true}
                density={"compact"}
                columns={columns}
                rows={data || []}
                disableColumnFilter
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
            />
        </div>
    )
}