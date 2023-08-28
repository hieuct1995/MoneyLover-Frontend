import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { TransactionService } from '../../services/transaction.service';
import { getAllTransaction, setTransactionSelect } from '../../redux/transactionSlice';
import {getAllWallet, setWalletSelect} from '../../redux/walletSlice';
import {WalletService} from "../../services/wallet.service";
import {useTranslation} from "react-i18next";

export default function ModalDeleteTrans({ idWallet, onClose }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    let transactionSelect= useSelector(state => state.transaction.transactionSelect);
    let walletSelect = useSelector(state => state.wallet.walletSelect);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        TransactionService.deleteTransaction(idWallet, transactionSelect?.id).then((res) => {
            if (res.data.message === 'Delete transaction success!') {
                let newMoney;
                if (transactionSelect.category.type === 'expense') {
                    newMoney = walletSelect.amountOfMoney + transactionSelect.amount
                } else newMoney = walletSelect.amountOfMoney - transactionSelect.amount
                dispatch(setWalletSelect({...walletSelect, amountOfMoney: newMoney}))
                TransactionService.getAllTransactionOfWallet(idWallet).then(res => {
                    let transactionList = res.data.transactionList;
                    dispatch(getAllTransaction(transactionList));
                    dispatch(setTransactionSelect(transactionList[0]))
                    WalletService.getAllWallet().then(res => {
                        dispatch(getAllWallet(res.data.walletList));
                    })
                    onClose();

                }).catch(err => console.log(err.message));
            } else {
                alert('không có quyền xóa');
            }
            handleClose();
        }).catch(err => console.log(err.message));
    }
    const {t}=useTranslation()

    return (<div>
        <Button color="error" onClick={handleClickOpen}>
            {t("DELETE")}
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("Are you sure want to delete this Transaction?")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("Delete can't get it back ^^")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="success" variant="outlined" onClick={handleClose} autoFocus>{t("Cancel")}</Button>
                <Button color="error" variant="contained" onClick={() => {
                    handleDelete();
                }}>
                    {t("DELETE")}
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}