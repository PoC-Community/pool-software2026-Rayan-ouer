use crate::model::Task;
use serde_json::{from_str, to_string_pretty};


fn get_vector_task() -> Vec<Task>
{
    let json = std::fs::read_to_string("./src/data/tasks.json").unwrap();
    return from_str::<Vec<Task>>(&json).unwrap();
}

pub fn display_task() -> u32
{
    let tasks: Vec<Task> = get_vector_task();
    println!("Here are your tasks:");

    for task in tasks {
        println!("-- {} -- [{}] {}", task.id, if task.completed { "X" } else { "" }, task.description);
    }
    println!("");
    1
}

pub fn create(input: &str) -> u32
{
    let mut tasks: Vec<Task> = get_vector_task();
    let id = tasks.len() + 1;
    let task = Task { id: id as u32, description: input.split("").collect(), completed: false};
    tasks.push(task);
    let json = to_string_pretty(&tasks).unwrap();
    std::fs::write("./src/data/tasks.json", json).unwrap();
    1
}

pub fn update(input: &str) -> u32
{
    1
}

pub fn delete(input: &str) -> u32
{
    let mut tasks: Vec<Task> = get_vector_task();
    1
}

pub fn exit() -> u32
{
    println!("See you!");
    2
}
