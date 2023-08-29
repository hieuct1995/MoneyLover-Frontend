import { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";
import { useDispatch } from "react-redux";
import { WalletService } from "../services/wallet.service";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { getAllWallet as setAllWallet } from "../redux/walletSlice";

const override = {
    display: "block",
    margin: "auto",
  };

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getAllWallet = () => {
        try {
            setIsLoading(true);
            WalletService.getAllWallet().then(res => {
                console.log('====================================');
                console.log(123);
                console.log('====================================');
                let walletList = res.data.walletList;
                dispatch(setAllWallet(walletList));
                if (walletList.length > 0) {
                    setIsLoading(false);
                } else (
                    navigate('/my-wallets')
                )
            })
        } catch (error) {
            console.log(error.message);
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
                size={50}
                loading={isLoading}
                cssOverride={override}
                aria-label="Loading Spinner"
                color="#2db84c"
            />
            }
        </>
    )
}