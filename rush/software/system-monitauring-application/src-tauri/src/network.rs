use sysinfo::{Networks};
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize)]
pub struct Network {
    received: f64,
    transmitted: f64,
    ip_adress: String
}

impl Network {
    pub fn new() -> Self {
        Network { received: 0.0, transmitted: 0.0, ip_adress: String::from("") }
    }

    pub fn update(&mut self) {
        let networks = Networks::new_with_refreshed_list();
        let wifi = networks.get("wlo1");
        match wifi {
            Some(t) => {
                self.received = t.total_received() as f64 / 1_000_000_000.0;
                self.transmitted = t.total_transmitted() as f64 /  1_000_000_000.0;
                self.ip_adress = t.ip_networks()
                    .iter()
                    .filter(|ip| ip.addr.is_ipv4() && !ip.addr.is_loopback())
                    .map(|ip| ip.addr.to_string()).next().unwrap_or_default();
            }
            None => {}
        }
    }
}
