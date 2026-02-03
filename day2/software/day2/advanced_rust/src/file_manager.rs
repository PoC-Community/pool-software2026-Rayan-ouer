use std::path::Path;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum FileManagerError {
    #[error("file not found")]
    FileNotFound,
    #[error("Permission denied")]
    PermissionDenied,
    #[error("Invalid path")]
    InvalidPath,
    #[error("io error: {0}")]
    GeneralError(#[from] std::io::Error),
}

pub struct FileManager {}

impl FileManager {
    pub fn list_files(path: String) -> Result<Vec<String>, FileManagerError> {
        let mut vec_file: Vec<String> = Vec::new();
        if !Path::new(&path).exists() {
            return Err(FileManagerError::FileNotFound);
        }
        for entry in std::fs::read_dir(path)? {
            let entry = entry?;
            let file_type = entry.file_type()?;
            if file_type.is_dir() {
                continue;
            }
            let into_string = entry.file_name().into_string().unwrap();
            vec_file.push(into_string);
        }
        Ok(vec_file)

    }

    //pub fn read_file(path: String) -> String
}
