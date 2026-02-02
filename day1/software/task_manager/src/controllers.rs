use crate::repositories::add_task;
use crate::repositories::display_task;
use crate::repositories::exit;

pub fn call_function_database(input: &str) -> u32
{
    match input {
        "1" => display_task(),
        "2" => add_task(),
        "3" => exit(),
        _ => {println!("Type 1, 2, or 3.\n"); 0}
    }
}