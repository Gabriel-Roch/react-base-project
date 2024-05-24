import { GridColDef } from "@mui/x-data-grid"

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 's_name', headerName: 'Nome', width: 250 },
    { field: 'contact', headerName: 'Contato', width: 200 },
    {
        field: 's_active', headerName: 'Ativo', width: 150,
        renderCell: (params) => {
            const rows = params.row
            if (rows.s_active) {
                return [
                    <button className='bg-green-700 text-white text-xs px-1 rounded-2xl tracking-widest uppercase rs-text-semibold'>Ativo</button>
                ]
            }
            return [
                <button className='bg-red-700 text-white text-xs px-1 rounded-2xl tracking-widest uppercase rs-text-semibold'>Desativado</button>
            ]
        }
    }
]