import NavbarMyWallet from "../../components/layout/NavbarMyWallet";
import NestedModal from "../../components/modals/NestedModal";
import CardWallet from "../../components/layout/CardWallet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PacmanLoader from 'react-spinners/PacmanLoader';
import { WalletService } from "../../services/wallet.service";
import { getAllWallet as setAllWallet } from "../../redux/walletSlice";

export default function MyWallet() {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    let allWallet = useSelector(state => state.wallet.allWallet);
    useEffect(() => {
        setIsLoading(true);
        WalletService.getAllWallet().then(res => {
            let walletList = res.data.walletList
            dispatch(setAllWallet(walletList))
            setIsLoading(false);
            setShowModal(walletList.length === 0);
        }).catch(err => console.log(err.message))
    }, [allWallet]);

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleSubmitModal = () => {
        setShowModal(false);
    }
    return (
        <>
            {isLoading ?
                <div className='flex justify-center'>
                    <PacmanLoader
                        size={25}
                        loading={isLoading}
                        aria-label="Loading Spinner"
                        color="#2db84c"
                    />
                </div>
                :
                <>
                    {showModal &&
                        <>
                            <NavbarMyWallet />
                            <NestedModal is isOpen={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
                        </>
                    }
                    {!showModal && <CardWallet />}
                </>
            }
        </>
    );
}