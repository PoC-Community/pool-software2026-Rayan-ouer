use crate::model::Task;
use serde_json::{from_str};

pub fn display_task() -> u32
{
    let json = std::fs::read_to_string("./src/data/tasks.json").unwrap();
    let tasks = from_str::<Vec<Task>>(&json).unwrap();

    println!("Here are your tasks:");

    for task in tasks {
        println!("-- {} -- [{}] {}", task.id, if task.completed { "X" } else { "" }, task.description);
    }
    println!("");
    1
}

pub fn add_task() -> u32
{
    1
}

pub fn exit() -> u32
{
    println!("See you!");
    2
}
