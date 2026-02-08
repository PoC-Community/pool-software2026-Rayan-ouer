use serde::{Deserialize, Serialize};
use crate::cpu::CPU;
use crate::gpu::GPU;
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
    gpu: GPU,
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
            gpu: self.gpu.clone(),
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
        let gpu = GPU::new();
        Module { cpu, disk: disk, memory: memory, network: network, host: host, gpu: gpu, sys }
    }

    pub fn update(&mut self) {
        self.sys.refresh_all();
        self.cpu.update(&mut self.sys);
        self.disk.update(&self.sys);
        self.memory.update(&self.sys);
        self.network.update();
        self.host.update();
        self.gpu.update();
    }
}