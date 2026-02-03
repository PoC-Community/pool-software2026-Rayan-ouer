use crate::repositories::display_task;
use crate::repositories::exit;

fn get_command(input: &str) -> Vec<String> {
    let str_vec: Vec<String> = input.split(' ').map(|s| s.to_string()).collect();
    str_vec
}

pub fn call_function_database(input: &str) -> u32 {
    let command = get_command(input);

    match command.get(0).map(String::as_str) {
        Some("1") => display_task(),
        Some("2") => crate::repositories::create(command),
        Some("3") => crate::repositories::update(command),
        Some("4") => crate::repositories::delete(command),
        Some("5") => exit(),
        _ => { println!("Type 1, 2, 3, 4 or 5."); 0 }
    }
}
