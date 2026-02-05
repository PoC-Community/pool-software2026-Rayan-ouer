use std::io::{Write, stdout};
use clap::{Parser, Subcommand};
mod model;
mod crypto;
mod storage;
use rand::Rng;

use rand::distr::{Alphanumeric};
use model::{PasswordEntry, PasswordStore};
use storage::Storage;
use crypto::CryptoManager;

#[derive(Subcommand)]
enum Commands {
    Add {
        service: String,
        username: String
    },
    Get{
        service: String
    },
    List,
    Delete{
        service: String
    },
    Generate {
        #[arg(default_value_t = 16)]
        length: u16
    }
}

#[derive(Parser)]
#[command(name = "pwdmgr")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

fn generate_password(length: usize) -> String {
    let mut rng = rand::rng();
    let chars: String = (0..length).map(|_| rng.sample(Alphanumeric) as char).collect();
    return chars;
}

fn add(store: &mut PasswordStore, storage: &Storage, service: String, username: String) {
    print!("Your password for {} :\n", service);
    let _ = stdout().flush().unwrap();
    let password = rpassword::read_password().unwrap();
    println!("");
    store.store.push(PasswordEntry { service, username, password });
    storage.save(store);
}


fn get(store: &PasswordStore, service: String)
{
    match store.store.iter().find(|entry| entry.service == service)
    {
        Some(entry) => {
            println!("Service: {}, Username: {}, Password: {}", entry.service, entry.username, entry.password);
        }
        None => println!("No entry found for service: {}", service),
    }
}

fn list(store: &PasswordStore)
{
    if store.store.is_empty() {
        println!("No passwords stored.");
        return;
    }
    for entry in &store.store {
        println!("Username : {}, Password : {}, Service {}", entry.username, entry.password, entry.service);
    }
}


fn delete(store: &mut PasswordStore, storage: &Storage, service: String)
{
    store.store.retain(|x| x.service != service);
    storage.save(&store);
}
fn main() {
    let cli: Cli = Cli::parse();
    println!("Your master password : ");
    let _ = stdout().flush().unwrap();
    let master_password: String = rpassword::read_password().unwrap();
    println!("");
    let crypto_manager: CryptoManager = CryptoManager::new(master_password);
    let storage: Storage = Storage { crypto_manager: crypto_manager };
    let mut store: PasswordStore = match storage.load() {
        Ok(t) => t,
        Err(_) => {
            println!("Wrong master password");
            return;
        }
    };

    match cli.command {
        Commands::Add { service, username } => {
            add(&mut store, &storage, service, username);
        }
        Commands::Get { service } => {
            get(&mut store, service);
        }
        Commands::List => {
            list(&store);
        }
        Commands::Delete { service } => {
            delete(&mut store, &storage, service);
        }
         Commands::Generate { length } => {
            let password = generate_password(length as usize);
            println!("Generated password: {}", password);
        }
    }
}

