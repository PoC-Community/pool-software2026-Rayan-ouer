use std::{fs::{read_to_string}};
use clap::{Error, Parser};
use colored::Colorize;

#[derive(Parser, Debug)]
pub struct Args {
    pub pattern: String,
    pub file: String,
    #[arg(short = 'i', long = "case-insensitive")]
    pub case_insensitive: bool,
    #[arg(short = 'n', long = "line-numbers")]
    pub line_numbers: bool,
}




fn print_content(line: (usize, &str), line_copy: String, pattern: &String, print_index: bool) -> ()
{
    if line.1.contains(pattern) && print_index {
        println!("{}:{}", line.0.to_string().green(), line_copy.red());
        return;
    }
    if line.1.contains(pattern) && !print_index {
        println!("{}", line_copy.red());
    }
}

fn search_in_file(args: Args) -> Result<(), Error>
{
    let content = read_to_string(&args.file)?;

    for line in content.lines().enumerate() {
        let lower_line: (usize, &str) = (line.0, &line.1.to_lowercase().clone());
        if args.case_insensitive {
            print_content(lower_line, line.1.to_string(), &args.pattern.to_lowercase(), args.line_numbers);
            continue;
        }
        else {
            print_content(line, line.1.to_string(), &args.pattern, args.line_numbers);
        }
    }
    Ok(())
}

fn main() {
    let args = Args::parse();

    let _ = search_in_file(args);
}