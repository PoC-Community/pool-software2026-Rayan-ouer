mod router;
mod controllers;
mod repositories;
mod views;
mod model;

use router::router;
fn main() {
    router();
}
