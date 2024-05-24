import {
    ThumbsUp,
    ThumbsDown
} from "lucide-react"
import { GridColDef } from '@mui/x-data-grid';
import Price from "./Price";
import { ModalSuite } from "../../../components/modal/ModalSuite";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

interface PropsColumns {
    updateGridControlProduct: (update: boolean) => void
}

export function Columns({
    updateGridControlProduct
}: PropsColumns) {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'p_name', headerName: 'Nome' },
        { field: 'supplier', headerName: 'Fornecedor' },
        { field: 'supplier_contact', headerName: 'Contato Fornecedor' },
        { field: 'qty_stock', headerName: 'Estoque', type: 'number' },
        {
            field: 'p_active',
            headerName: 'Ativo',
            renderCell: (params) => {
                const rows = params.row
                if (!rows.s_active) {
                    return [
                        <button className='bg-green-700 text-white text-xs px-1 rounded-2xl tracking-widest uppercase rs-text-semibold'>Ativo</button>
                    ]
                }

                return [
                    <button className='bg-red-700 text-white text-xs px-1 rounded-2xl tracking-widest uppercase rs-text-semibold'>Desativado</button>
                ]
            }
        },
        { field: 'purchase_price', headerName: 'Preço Compra', type: 'number' },
        { field: 'sale_price', headerName: 'Preço Venda', type: 'number' },
        {
            field: 'status_sales',
            headerName: 'Vendido',
            type: 'actions',
            renderCell: (params) => {
                const row = params.row

                if (row.status_sales == "n") {
                    return [
                        <div className='flex justify-center'>
                            <ThumbsDown size={20} color="#a10c0c" strokeWidth={2} />
                        </div>

                    ]
                }
                return [
                    <>
                        <div className='flex justify-center'>
                            <ThumbsUp size={20} color="#16a10c" strokeWidth={2} />
                        </div>
                    </>
                ]
            }
        },
        {
            field: 'actions',
            headerName: 'Ações',
            type: 'actions',
            renderCell: (params) => {
                const row = params.row
                const status_delete = row.status_sales === "n" ? true : false;
                return [
                    <div className='flex justify-center gap-x-3'>
                        <ModalSuite
                            modalTitle={'Edição Produto: ' + row.p_name}
                            sizeModal='lg'
                            body={
                                <EditProduct
                                    id_product={row.id}
                                    idSupplier={row.id_supplier}
                                    name={row.p_name}
                                    purchasePrice={row.purchase_price}
                                    qtyStock={row.qty_stock}
                                    salePrice={row.sale_price}
                                    updateGridControlProduct={updateGridControlProduct}
                                />
                            }
                            buttonIcon='settings'
                        />
                        <ModalSuite
                            modalTitle={'Preço Produto: ' + row.p_name}
                            sizeModal='md'
                            body={
                                <Price
                                    id={row.id}
                                    updateGridControlProduct={updateGridControlProduct}
                                />
                            }
                            buttonIcon='dollar'
                            visibleFooter={false}
                        />
                        {status_delete ?
                            (
                                <DeleteProduct
                                    id_product={row.id}
                                    updateGridControlProduct={updateGridControlProduct}
                                />
                            )
                            : null}
                    </div>
                ]
            }
        }
    ]
    return columns
}