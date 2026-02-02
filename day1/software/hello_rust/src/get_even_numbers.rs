pub fn get_even_numbers(numbers: &[i32]) -> String
{
    let mut numbers_copy: Vec<_>= numbers.iter().filter(|&&x| (x % 2) == 0).collect();
    numbers_copy.sort();

    let stuff_str: String = numbers_copy.into_iter().map(|i| i.to_string()).collect::<String>();
    stuff_str
}
