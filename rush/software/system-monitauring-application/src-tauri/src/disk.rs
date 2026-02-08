use serde::{Deserialize, Serialize};
use sysinfo::System;

#[derive(Serialize, Deserialize)]
pub struct Pid {
    pid_name: String,
    usage: u64
}

#[derive(Serialize, Deserialize)]
pub struct Disk {
    pids_vec: Vec<Pid>,
}

impl Disk {
    pub fn new() -> Self
    {
        Disk { pids_vec: Vec::new() }
    }
    pub fn update(&mut self, sys: &System) {
        for process in sys.processes() {
            let pid_name = process.1.name().to_os_string().into_string();
            let usage = process.1.disk_usage().total_read_bytes;
            match pid_name {
                Ok(x) => {
                    let value: Pid = Pid { pid_name: x, usage: usage };
                    self.pids_vec.push(value);
                }
                Err(_) => { continue; }
            }
        }
    }
}