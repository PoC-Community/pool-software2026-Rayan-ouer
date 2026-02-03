mod config_parser;
mod file_manager;
use file_manager::FileManager;
use file_manager::FileManagerError;
use config_parser::Config;

fn main() {
    let path: String = "./test.txt".to_string();
    let content : String = FileManager::read_file(path).unwrap();
    println!("{}", content);
    let configs = Config::from_file("test.txt".to_string()).unwrap();
    for (name, section) in &configs.sections {
        if let Some(host) = section.data.get("host") {
            println!("Section: {}, host = {}", name, host);
        }
    }
    let config: Config = Config { sections: configs.sections };
    let value = config.get("database".to_string(), "host".to_string());
    println!("{}", value.unwrap());
}
