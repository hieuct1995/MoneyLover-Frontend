import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";
import { useDispatch, useSelector } from "react-redux";
import { WalletService } from "../services/wallet.service";
import { getAllWallet } from "../redux/walletSlice";
import { useNavigate } from "react-router-dom";
import {PacmanLoader} from "react-spinners/ClipLoader"

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        WalletService.getAllWallet().then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            let walletList = res.data.walletList;
            dispatch(getAllWallet(walletList));
            if (walletList.length > 0) {
                setIsLoading(false);
            } else (
                navigate('/my-wallets')
            )
        })
    }, [])
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            {!isLoading &&
                <>
                    <NavBar onClickAddBtn={handleOpenModal} />
                    <div>
                        <Sidebar />
                        <div> <TransactionCard openModal={isModalVisible} closeModal={handleCloseModal} /></div>
                    </div>
                </>
            }
            <PacmanLoader
                loading={isLoading}
                size={25}
                aria-label="Loading Spinner"
                color="#36d7b7"
            />
        </>
    )
}