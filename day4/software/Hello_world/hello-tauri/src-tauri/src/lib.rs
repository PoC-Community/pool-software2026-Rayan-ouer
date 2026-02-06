// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use tauri::async_runtime::Mutex;

pub struct AppState {
    pub data: Mutex<u32>
}
 
impl AppState {
    pub fn new(value: u32) -> Self {
        Self {
            data: Mutex::new(value),
        }
    }
    pub fn increment_counter(&mut self) -> Mutex<u32> {
        *self.data.get_mut() += 1;
        let nb: u32 = *self.data.get_mut();
        return nb.into();
    }
    pub fn get_counter(&self) -> u32 {
        let mut ptr = self.data.lock().await.to_be();
    }
}


#[tauri::command]
fn greet(name: String) -> String  {
    let greet_string = format!("Hello, World! This message comes from Rust! {}", name);
    greet_string
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
