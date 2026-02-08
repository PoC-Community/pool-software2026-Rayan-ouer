use sysinfo::System;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Core {
    frequency: u64,
    usage: f32,
    name: String,
    vendor: String
}

#[derive(Serialize, Deserialize, Clone)]
pub struct CPU {
    usage: f32,
    computer_cores: Vec<Core>,
}

impl CPU {
    pub fn new() -> Self {
        CPU { usage: 0.0, computer_cores: Vec::new() }
    }
    pub fn update(&mut self, sys: &mut System)
    {
        self.computer_cores.clear();
        sys.refresh_cpu_usage();
        std::thread::sleep(std::time::Duration::from_millis(100));
        sys.refresh_cpu_usage();
        self.computer_cores.clear();
        for cpu in sys.cpus() {
            let core: Core = Core { frequency: cpu.frequency(), usage: cpu.cpu_usage(), name: cpu.name().to_string(), vendor: cpu.vendor_id().to_string() };
            self.computer_cores.push(core);
        }
        self.usage = sys.global_cpu_usage();
    }
}
