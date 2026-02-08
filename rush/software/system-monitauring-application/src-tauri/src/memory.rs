use sysinfo::System;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Memory {
    total_memory: u64,
    used_memory: u64,
    total_swap: u64,
    used_swap: u64
}

impl Memory {
    pub fn new() -> Self {
        Memory { total_memory: 0, used_memory: 0, total_swap: 0, used_swap: 0 }
    }

    pub fn update(&mut self, sys: &System) {
        self.total_memory = sys.total_memory();
        self.used_memory = sys.used_memory();
        self.total_swap= sys.used_memory();
        self.used_swap = sys.used_swap();
    }
}