#[derive(serde::Deserialize, serde::Serialize)]
pub struct Task {
    pub id: u32,
    pub description: String,
    pub completed: bool
}