Step 1.>
CREATE DATABASE birthdaybash;
Step 2.>
\c birthdaybash ;
-- to connect to database
Step 3.>
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

Step 4.>
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    dob DATE NOT NULL,
    bio VARCHAR(100) ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    followers_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0
);