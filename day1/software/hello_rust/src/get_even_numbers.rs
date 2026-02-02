use std::ops::Add;

pub fn get_even_numbers(numbers: &[i32]) -> String
{
    let mut numbers_copy: Vec<_>= numbers.iter().filter(|&&x| (x % 2) == 0).collect();
    numbers_copy.sort();

    let mut stuff_str: String = numbers_copy.into_iter().map(|i| i.to_string().add(" - ")).collect::<String>();
    stuff_str.pop();
    stuff_str.pop();
    stuff_str
}
