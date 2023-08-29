import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";
import { useSelector } from "react-redux";
import VariantsSpin from "../components/alert/SpinLoading";

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    let loginSuccess = useSelector(state => state.auth.login.success);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            <NavBar onClickAddBtn={handleOpenModal} />
            {loginSuccess ?
                <div>
                    <Sidebar />
                    <div> <TransactionCard openModal={isModalVisible} closeModal={handleCloseModal} /></div>
                </div>
                :
                <VariantsSpin/>
            }

        </>
    )
}