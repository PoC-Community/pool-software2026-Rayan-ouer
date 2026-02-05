use sha2::{Sha256, Digest};
use aes_gcm::{
    Aes256Gcm, Error, Nonce, aead::{Aead, AeadCore, Key, KeyInit, OsRng}
};

pub struct CryptoManager {
    cypher: Aes256Gcm,
}

impl CryptoManager {
    pub fn new(password: String) -> Self  {
        let mut hasher = Sha256::new();
        hasher.update(password.as_bytes());
        let result = hasher.finalize();
        let key = Key::<Aes256Gcm>::from_slice(&result);
        let cypher  = Aes256Gcm::new(key);
        Self { cypher: cypher }
    }

    pub fn encrypt(&self, password: String) -> Result<Vec<u8>, Error> {
        let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
        let text = self.cypher.encrypt(&nonce, password.as_bytes());
        match text {
            Ok(t) => {
                let mut result = nonce.to_vec();
                result.extend_from_slice(&t);
                Ok(result)
            }
            Err(e) => { 
                Err(e)
            }
        }
    }

    pub fn decrypt(&self, data: &[u8]) -> Result<String, Error> {
        let (nonce_bytes, ciphertext) = data.split_at(12);
        let nonce = Nonce::from_slice(nonce_bytes);
        let text = self.cypher.decrypt(&nonce, ciphertext);
        match text {
            Ok(t) => { Ok(String::from_utf8(t).unwrap()) },
            Err(e) => { Err(e)}
        }
    }
}
