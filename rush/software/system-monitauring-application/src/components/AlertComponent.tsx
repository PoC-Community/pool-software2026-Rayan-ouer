import { Module } from "@/model/ModuleSchema";
import { Button } from "./ui/button";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import { Cpu } from "@/model/cpuSchema";

type ModalContentProps = {
  closeModal: () => void;
  data: Cpu;
}

const handleDownloadTauri = async (data: Cpu) => {
    try {
        const filePath = await save({defaultPath: "computerdata.json", filters: [{ name: "JSON", extensions: ["json"] }],
        });
    if (!filePath)
        return;
    await writeTextFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Erreur export JSON :", err);
    }
};

export function AlertComponent({ closeModal, data }: ModalContentProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md z-10">
        <h1 className="text-xl font-bold mb-4">Export Module</h1>
        <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-64">
          {JSON.stringify(data, null, 2)}
        </pre>

        <div className="flex justify-between mt-4">
          <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={() => handleDownloadTauri(data)}>
            Export
          </Button>
        <Button onClick={() => handleDownloadTauri(data)}>
            +
        </Button>
        </div>
      </div>
    </div>
  );
}
