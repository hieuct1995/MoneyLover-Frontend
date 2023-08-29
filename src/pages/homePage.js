import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";
import { useDispatch, useSelector } from "react-redux";
import { WalletService } from "../services/wallet.service";
import { getAllWallet } from "../redux/walletSlice";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners/ClipLoader"

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getAllWallet = () => {
        try {
            setIsLoading(true);
            WalletService.getAllWallet().then(res => {
                let walletList = res.data.walletList;
                dispatch(getAllWallet(walletList));
                if (walletList.length > 0) {
                    setIsLoading(false);
                } else (
                    navigate('/my-wallets')
                )
            })
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getAllWallet();
    }, [])
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            {!isLoading ?
                <>
                    <NavBar onClickAddBtn={handleOpenModal} />
                    <div>
                        <Sidebar />
                        <div> <TransactionCard openModal={isModalVisible} closeModal={handleCloseModal} /></div>
                    </div>
                </>
                :
            <PacmanLoader
                size={25}
                aria-label="Loading Spinner"
                color="#36d7b7"
            />
            }
        </>
    )
}