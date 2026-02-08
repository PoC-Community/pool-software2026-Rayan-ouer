use serde::{Deserialize, Serialize};
use crate::cpu::CPU;
use crate::disk::Disk;
use crate::memory::Memory;
use crate::network::Network;
use crate::host::Host;
use sysinfo::System;

#[derive(Serialize, Deserialize)]
pub struct Module {
    cpu: CPU,
    disk: Disk,
    memory: Memory,
    network: Network,
    host: Host,
    #[serde(skip)]
    sys: System
}

impl Module {
    pub fn new() -> Self {
        let sys = System::new_all();
        let cpu = CPU::new();
        let disk = Disk::new();
        let memory = Memory::new();
        let network= Network::new();
        let host =  Host::new();
        Module { cpu, disk: disk, memory: memory, network: network, host: host, sys }
    }

    pub fn update(&mut self) {
        self.sys.refresh_all();
        self.cpu.update(&self.sys);
        self.disk.update(&self.sys);
        self.memory.update(&self.sys);
        self.network.update();
        self.host.update();
    }
}