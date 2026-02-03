use std::collections::HashMap;
use thiserror::Error;

#[derive(Debug)]
pub struct Section
{
    pub name: String,
    pub data: HashMap<String, String>,
}

#[derive(Debug)]
pub struct Config
{
    pub sections: HashMap<String, Section>,
}

#[derive(Debug, Error)]
pub enum ConfigError {
    #[error("Invalid format at line")]
    InvalidFormat,
    #[error("Missing section")]
    MissingSection,
    #[error("Duplicate key")]
    DuplicateKey(String),
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

impl Config {
    pub fn parse(content: String) -> Result<Config, ConfigError>
    {
        let mut sections: HashMap<String, Section> = HashMap::new();
        let mut section_name: String = String::new();
    
        for line in content.lines() {
            if line.starts_with("#") || line.is_empty() {
                continue;
            }
            if line.starts_with("[") && line.ends_with("]") {
                section_name = line.to_string().replace("[", "").replace("]", "").to_string();
                sections.insert(section_name.clone(), Section { name: section_name.clone(), data: HashMap::new()});
                continue;
            }
            let variable_vec: Vec<&str> = line.split("=").map(|i| i.trim()).collect();
            if variable_vec.len() != 2 {
                return Err(ConfigError::InvalidFormat);
            }
            println!();
            let section = sections.get_mut(&section_name).ok_or(ConfigError::MissingSection)?;
            section.data.insert(variable_vec[0].to_string(), variable_vec[1].to_string());
        }
        Ok(Config { sections })
    }
}
