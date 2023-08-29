import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";
import { useDispatch, useSelector } from "react-redux";
import { WalletService } from "../services/wallet.service";
import PacmanLoader from "react-spinners"
import { getAllWallet } from "../redux/walletSlice";
import { useNavigate } from "react-router-dom";

const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        WalletService.getAllWallet().then(res => {
            let walletList = res.data.walletList;
            dispatch(getAllWallet(walletList));
            if (walletList.length > 0) {
                setIsLoading(true);
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
            <NavBar onClickAddBtn={handleOpenModal} />
            {!isLoading ?
                <div>
                    <Sidebar />
                    <div> <TransactionCard openModal={isModalVisible} closeModal={handleCloseModal} /></div>
                </div>
                :
                <PacmanLoader
                    cssOverride={override}
                    color="#36d7b7"
                />
            }
        </>
    )
}