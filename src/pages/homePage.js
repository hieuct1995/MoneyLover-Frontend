import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            <NavBar onClickAddBtn={handleOpenModal} />
            <div>
                <Sidebar />
                   <div> <TransactionCard openModal = {isModalVisible} closeModal={handleCloseModal}/></div>
            </div>
        </>
    )
}