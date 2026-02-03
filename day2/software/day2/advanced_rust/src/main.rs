mod file_manager;

use file_manager::FileManager;
fn main() {
    let path: String = "./src".to_string();
    let vec_file = FileManager::list_files(path.clone()).unwrap();

    println!("READ DIR :");
    for file in vec_file  {
        println!("{}", file);
    }

    let path = "./Cargo.toml".to_string();
    println!("\nREAD FILE : ");
    let content = FileManager::read_file(path.clone()).unwrap();
    print!("Content :");
    println!("{}", content);

    let path: String = "./test.txt".to_string();
    println!("WRITE FILE :");
    let content: String = "TEST".to_string();
    let _ = FileManager::write_file(path, content);


    let src_path: String = "./test.txt".to_string();
    let dest_path: String = "./dest.txt".to_string();
    let _ = FileManager::copy_file(src_path, dest_path);
}
