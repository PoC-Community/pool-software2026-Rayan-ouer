use serde::{Deserialize, Serialize};
use sysinfo::{Disks, System};

#[derive(Serialize, Deserialize, Clone)]
pub struct Pid {
    pid_name: String,
    usage: u64
}

#[derive(Serialize, Deserialize,Clone)]
pub struct DiskInfo {
    total: u64,
    used: u64,
    available: u64,
    pids_vec: Vec<Pid>,
}

impl DiskInfo {
    pub fn new() -> Self
    {
        DiskInfo { total: 0, used: 0, available: 0, pids_vec: Vec::new() }
    }
    pub fn update(&mut self, sys: &System) {
        self.total = 0;
        self.used = 0;
        self.available = 0;
        self.pids_vec.clear();
        let disks: Disks = Disks::new_with_refreshed_list();
        for disk in disks.list() {
            self.total += disk.total_space();
            self.available += disk.available_space();
        }
        self.used = self.total - self.available;
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