Step 1.>
CREATE DATABASE birthdaybash;

Step 2.>
SET TIMEZONE='UTC';

Step 3.>
\c birthdaybash ;   -- to connect to database

Step 4.>
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

Step 5.>
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE NOT NULL,
    id SERIAL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    dob VARCHAR NOT NULL,
    gender VARCHAR(10) NOT NULL,
    bio VARCHAR(100) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    followers_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0,
    last_username_change_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
    -- username_change_count smallint DEFAULT 0,
    
-- For Seaching Feature
Step 6.>
CREATE INDEX CONCURRENTLY idx_id_user ON users(id); 

Step 7.>
CREATE EXTENSION pg_trgm;

Step 8.>
CREATE INDEX CONCURRENTLY idx_username_trgm ON users USING gin (username gin_trgm_ops);