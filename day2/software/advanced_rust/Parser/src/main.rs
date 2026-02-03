mod config_parser;
mod file_manager;
use file_manager::FileManager;
use config_parser::Config;

fn main() {
    let path: String = "./test.txt".to_string();
    let content : String = FileManager::read_file(path).unwrap();
    println!("{}", content);
    let config = Config::parse(content).unwrap();
    for (name, section) in &config.sections {
        if let Some(host) = section.data.get("host") {
            println!("Section: {}, host = {}", name, host);
    }
}

}
