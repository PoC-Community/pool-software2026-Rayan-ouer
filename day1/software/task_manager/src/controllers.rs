use crate::repositories::display_task;
use crate::repositories::exit;

pub fn call_function_database(input: &str) -> u32
{
    match input {
        "1" => display_task(),
        "2" => crate::repositories::create(input),
        "3" => crate::repositories::update(input),
        "4" => crate::repositories::delete(input),
        "5" => exit(),
        _ => {println!("Type 1, 2, or 3.\n"); 0}
    }
}
