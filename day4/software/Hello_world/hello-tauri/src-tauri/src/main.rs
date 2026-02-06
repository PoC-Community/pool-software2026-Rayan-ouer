// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use hello_tauri_lib::AppState;
use tauri::{Builder, Manager};

fn main() {
    Builder::default().setup(|app| {
        app.manage(AppState::new(0));
        Ok(())
    });
    hello_tauri_lib::run()
}