import { useQuery } from "@tanstack/react-query"
import { instanceAxios } from "../../services/axios/axios"
import {
    DataGrid,
    GridToolbar,
    GridColDef
} from '@mui/x-data-grid';
import ChartPizza from "./ChartPizza";

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 's_status', headerName: 'Status', width: 250 },
    { field: 'u_name', headerName: 'Vendedor', width: 200 },
    { field: 'profit', headerName: 'Lucro', width: 200, cellClassName: "text-green-700" },
    { field: 'ttl', headerName: 'Total', width: 200 },
    { field: 'fk_p_type_name', headerName: 'Metodo', width: 200 }
]

export default function Report() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const response = await instanceAxios.get("/report")
            console.log(response.data)
            return response.data
        }
    })

    return (
        <>
            <div className="flex">
                <ChartPizza />
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