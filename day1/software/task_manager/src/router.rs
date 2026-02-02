use std::io;
use crate::controllers::call_function_database;

pub fn router() -> ()
{    
    println!("Welcome to your Task Manager!\n");

    loop {
        let mut input = String::new();
        println!("What do you want to do?");
        println!("1 - List all tasks");
        println!("2 - Add a task");
        println!("3 - Update a task");
        println!("4 - Delete a task");
        println!("5 - leave");
        io::stdin().read_line(&mut input).expect("Failed to read line");
        input.pop();
        if call_function_database(&input) == 2 {
            break;
        }
    }
}