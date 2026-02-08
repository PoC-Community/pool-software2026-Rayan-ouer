import {useState} from "react";
import { createPortal } from 'react-dom';
import { Button } from "./ui/button";
import { Module } from "@/model/ModuleSchema";
import { ExportComponent } from "./ExportComponent";


export function ExportButton({ data }: {data: Module}) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal)
    }
    return (
        <>
        <Button onClick={toggleModal}>
            Export
        </Button>
        {showModal && (
            <ExportComponent data={data} closeModal={() => setShowModal(false)}/>
        )
        }
        </>
    )
}