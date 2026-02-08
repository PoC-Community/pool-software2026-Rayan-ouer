use serde::{Deserialize, Serialize};
use crate::cpu::CPU;
use crate::disk::DiskInfo;
use crate::memory::Memory;
use crate::network::Network;
use crate::host::Host;
use sysinfo::{System};

#[derive(Serialize, Deserialize)]
pub struct Module {
    cpu: CPU,
    disk: DiskInfo,
    memory: Memory,
    network: Network,
    host: Host,
    #[serde(skip)]
    sys: System
}

impl Clone for Module {
    fn clone(&self) -> Self {
        Module {
            cpu: self.cpu.clone(),
            disk: self.disk.clone(),
            memory: self.memory.clone(),
            network: self.network.clone(),
            host: self.host.clone(),
            sys: System::new_all(),
        }
    }
}

impl Module {
    pub fn new() -> Self {
        let sys = System::new_all();
        let cpu = CPU::new();
        let disk = DiskInfo::new();
        let memory = Memory::new();
        let network= Network::new();
        let host =  Host::new();
        Module { cpu, disk: disk, memory: memory, network: network, host: host, sys }
    }

    pub fn update(&mut self) {
        self.sys.refresh_all();
        self.cpu.update(&mut self.sys);
        self.disk.update(&self.sys);
        self.memory.update(&self.sys);
        self.network.update();
        self.host.update();
    }
}