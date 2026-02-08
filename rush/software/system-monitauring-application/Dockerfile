FROM node:20 AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nailyudha/tauri AS backend

WORKDIR /app

RUN rustup install nightly && rustup default nightly

COPY src-tauri ./src-tauri
COPY --from=frontend /app/dist ./dist

WORKDIR /app/src-tauri
RUN cargo build --release
