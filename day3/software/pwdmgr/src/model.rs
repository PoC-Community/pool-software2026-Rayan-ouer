use serde::Serialize;
use serde::Deserialize;

#[derive(Serialize, Deserialize)]
pub struct PasswordEntry {
    pub service: String,
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize)]
pub struct PasswordStore {
   pub store: Vec<PasswordEntry>
}

impl Default for PasswordStore {
    fn default() -> PasswordStore {
        PasswordStore{ store: vec![] }
    }
}