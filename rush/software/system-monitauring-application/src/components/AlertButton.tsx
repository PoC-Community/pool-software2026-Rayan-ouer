import {useState} from "react";
import { Button } from "./ui/button";
import { Module } from "@/model/ModuleSchema";
import { AlertComputer } from "@/model/alertSchema";
import { AlertComponent } from "./AlertComponent";

export function AlertButton({ data, alert }: {data: any, alert: AlertComputer[]}) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal)
    }
    return (
        <>
        <Button size="sm" onClick={toggleModal}>
            +
        </Button>
        {showModal && (
            <AlertComponent data={data} closeModal={() => setShowModal(false)}/>
        )
        }
        </>
    )
}