use aes_gcm::Error;

use crate::crypto::CryptoManager;
use crate::model::PasswordStore;
use std::{path::Path};

const FILE: &str = ".pwdmgr_store.encrypted";

pub struct Storage {
    pub crypto_manager: CryptoManager
}

impl Storage {
    pub fn load(&self) -> Result<PasswordStore, Error> {
        let mut store: PasswordStore = PasswordStore::default();
        if !Path::new(FILE).exists() {
            return Ok(store);
        }
        let content = std::fs::read(FILE);
        match content {
            Ok(t) => {
                let decrypted: String = self.crypto_manager.decrypt(&t)?;
                let parsed = serde_json::from_str(&decrypted);
                match parsed {
                    Ok(data) => {
                        store = data;
                        return Ok(store);
                    }
                    Err(_) => {
                        println!("Cannot deserialize file");
                        Err(Error)
                    }
                }
            }
            Err(_) => {
                return Err(Error);
            }
        }
    }

    pub fn save(&self, store: &PasswordStore) {
        let serialized = serde_json::to_string(store);
        match serialized {
            Ok(json) => {
                let encrypted = self.crypto_manager.encrypt(json);
                match encrypted {
                    Ok(t) => { let _ = std::fs::write(FILE, t); }
                    Err(_) => { println!("Password cannot be encrypted"); }
                }
            }
            Err(_) => {}
        }
    }
}


