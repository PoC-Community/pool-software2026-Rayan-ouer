import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Module, ModuleSchema } from "../model/ModuleSchema.tsx";

export function useComputerData() {
    const [computerData, setComputerData] = useState<Module | null>();

    useEffect(() => {
        async function fetchData() {
            try {
                const raw = await invoke<Module>("get_module");
                const res = ModuleSchema.parse(raw);
                setComputerData(res);
            }
            catch (err) {
                console.log("Element are invalid in Module");
                setComputerData(null);
            }
        };
        fetchData();
        const id = setInterval(fetch, 1000);
        return () => clearInterval(id);
    }, []);
    return computerData;
}
