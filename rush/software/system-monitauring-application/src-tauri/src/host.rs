use sysinfo::System;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Host {
    name: String,
    kernel: String,
    os: String,
    host_name: String
}

impl Host {
    pub fn new() -> Self {
        Host { name: String::from(""), kernel: String::from(""), os: String::from(""), host_name: String::from("") }
    }
    pub fn update(&mut self) {
        match System::name() {
            Some(x) => { self.name = x},
            None => {}
        };
        match System::kernel_version() {
            Some(x) => { self.kernel = x },
            None => {}
        }
        match System::os_version() {
            Some(x) => { self.os = x },
            None => {}
        }
        match System::host_name() {
            Some(x) => { self.host_name = x },
            None => {}
        }
    }
}