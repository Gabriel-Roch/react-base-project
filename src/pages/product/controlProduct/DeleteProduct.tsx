import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Trash } from "lucide-react"
import { instanceAxios } from '../../../services/axios/axios';


interface PropsDeleteProduct {
    id_product: string
    updateGridControlProduct?: (update: boolean) => void
}

export default function DeleteProduct({
    id_product,
    updateGridControlProduct
}: PropsDeleteProduct) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id: string) => {
        try {

            await instanceAxios.delete("/products?id=" + id)

            if (updateGridControlProduct) {
                updateGridControlProduct(true)
            }

            setOpen(false);
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <Trash className='hover:cursor-pointer' onClick={handleClickOpen} size={20} color="#f40b0b" strokeWidth={1.75} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmação"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ao deletar será excluido o estoque e historico de preço desse produto,
                        você confirma essa ação ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Não Confirmo</Button>
                    <Button onClick={() => handleDelete(id_product)} autoFocus>
                        Confirmo e quero Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}