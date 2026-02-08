use gfxinfo::active_gpu;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct GPU {
    model: String,
    temperature: u32,
    total_vram: u64,
    used_vram: u64
}

impl GPU {
    pub fn new() -> Self {
        GPU { model: String::from(""), temperature: 0, total_vram: 0, used_vram: 0}
    }
    pub fn update(&mut self)
    {
        let gpu = active_gpu();
        match gpu {
            Ok(t) => {
                let info = t.info();
                self.model = t.model().to_string();
                self.temperature = info.temperature() / 1000;
                self.total_vram = info.total_vram();
                self.used_vram = info.used_vram();
            },
            Err(_) => {}
        }
    }
}
