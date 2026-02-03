use core::task;

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

pub fn create(vec_input: Vec<String>) -> u32
{
    let mut tasks: Vec<Task> = get_vector_task();
    let id = tasks.len() + 1;
    let task = Task { id: id as u32, description: vec_input[0].clone(), completed: false};
    tasks.push(task);
    let json = to_string_pretty(&tasks).unwrap();
    std::fs::write("./src/data/tasks.json", json).unwrap();
    1
}

pub fn update(vec_input: Vec<String>) -> u32
{
    let mut tasks: Vec<Task> = get_vector_task();
    let to_find: u32 = vec_input[1].parse().unwrap();

    for task in tasks.iter_mut() {
        if task.id == to_find {
            task.up();
        }
    }
    let json = serde_json::to_string_pretty(&tasks).unwrap();
    std::fs::write("./src/data/tasks.json", json).unwrap();
    1
}

pub fn delete(vec_input: Vec<String>) -> u32
{
    let mut tasks: Vec<Task> = get_vector_task();
    let to_find: u32 = vec_input[1].parse().unwrap();

    tasks.retain(|a | a.id != to_find);
    let json = serde_json::to_string_pretty(&tasks).unwrap();
    std::fs::write("./src/data/tasks.json", json).unwrap();
    1
}

pub fn exit() -> u32
{
    println!("See you!");
    2
}
