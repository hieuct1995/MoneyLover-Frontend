import NavbarMyWallet from "../../components/layout/NavbarMyWallet";
import NestedModal from "../../components/modals/NestedModal";
import CardWallet from "../../components/layout/CardWallet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PacmanLoader from 'react-spinners/PacmanLoader';

export default function MyWallet() {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    let allWallet = useSelector(state => state.wallet.allWallet);
    useEffect(() => {
        if (allWallet) {
            setIsLoading(false);
            setShowModal(allWallet.length === 0);
        } else {
            setIsLoading(true);
        }
    }, [allWallet]);

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleSubmitModal = () => {
        setShowModal(false);
    }
    return (
        <>
            {
                !isLoading ?
                    <>
                        {showModal &&
                            <>
                                <NavbarMyWallet />
                                <NestedModal is isOpen={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
                            </>
                        }
                        {!showModal && <CardWallet />}
                    </>
                    :
                    <div className='flex justify-center'>
                        <PacmanLoader
                            size={25}
                            loading={isLoading}
                            aria-label="Loading Spinner"
                            color="#2db84c"
                        />
                    </div>
            }
        </>

    );
}