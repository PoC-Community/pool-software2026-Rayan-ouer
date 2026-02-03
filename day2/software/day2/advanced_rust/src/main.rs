mod file_manager;

use file_manager::FileManager;
fn main() {
    let path: String = "./src".to_string();
    let vec_file = FileManager::list_files(path).unwrap();

    println!("File : ");
    for file in vec_file  {
        println!("{}", file);
    }
}
