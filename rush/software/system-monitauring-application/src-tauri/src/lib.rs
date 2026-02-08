// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod cpu;
mod disk;
mod host;
mod memory;
mod network;
mod main_module;

use main_module::Module;

#[tauri::command]
fn get_module() -> Module
{
    let mut module: Module = Module::new();
    module.update();
    module
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_module])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
