// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod cpu;
mod disk;
mod host;
mod memory;
mod network;
mod gpu;
mod main_module;
use once_cell::sync::Lazy;
use std::sync::Mutex;

use main_module::Module;

fn create_module() -> Mutex<Module> {
    let module = Module::new();
    Mutex::new(module)
}

static MODULE: Lazy<Mutex<Module>> = Lazy::new(create_module);

#[tauri::command]
fn get_module() -> Module {
    let mut module = MODULE.lock().unwrap();
    module.update();
    module.clone()
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
