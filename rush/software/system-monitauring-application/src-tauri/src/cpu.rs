use sysinfo::System;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Core {
    frequency: u64,
    usage: f32,
    name: String,
    vendor: String
}

#[derive(Serialize, Deserialize)]
pub struct CPU {
    usage: f32,
    computer_cores: Vec<Core>,
}

impl CPU {
    pub fn new() -> Self {
        CPU { usage: 0.0, computer_cores: Vec::new() }
    }
    pub fn update(&mut self, sys: &System)
    {    
        for cpu in sys.cpus() {
            let core: Core = Core { frequency: cpu.frequency(), usage: cpu.cpu_usage(), name: cpu.name().to_string(), vendor: cpu.vendor_id().to_string() };
            self.computer_cores.push(core);
        }
        self.usage = sys.global_cpu_usage();
    }
}
