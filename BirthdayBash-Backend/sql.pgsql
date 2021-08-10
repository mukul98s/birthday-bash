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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    dob TIMESTAMPTZ NOT NULL,
    gender VARCHAR(10) NOT NULL,
    bio VARCHAR(100) ,
    followers_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0
);
    --last_username_change_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- username_change_count smallint DEFAULT 0,
Step 6.>   
CREATE TABLE followers (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_user_id UUID REFERENCES users(user_id),
    dest_user_id  UUID REFERENCES users(user_id),
    dest_username VARCHAR(50) NOT NULL
);
    

-- For Seaching Feature
Step 7.>
CREATE INDEX CONCURRENTLY idx_id_user ON users(created_at,username); 

CREATE INDEX CONCURRENTLY idx_followers ON followers(created_at,source_user_id,dest_user_id);

Step 8.>
CREATE EXTENSION pg_trgm;

Step 9.>
CREATE INDEX CONCURRENTLY idx_username_trgm ON users USING gin (username gin_trgm_ops);



CREATE OR REPLACE FUNCTION followers_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$        
       BEGIN
         IF (TG_OP = 'INSERT') THEN
            UPDATE "users" SET "followers_count" = "followers_count" + 1 WHERE "user_id" = NEW."dest_user_id";
            RETURN NULL;
         ELSIF (TG_OP = 'DELETE') THEN    
            UPDATE "users" SET "followers_count" = "followers_count" - 1 WHERE "user_id" = NEW."dest_user_id";
             RETURN NULL;
         END IF;
       END;
    $$;

CREATE OR REPLACE FUNCTION following_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$        
     BEGIN
         IF (TG_OP = 'INSERT') THEN
            UPDATE "users" SET "following_count" = "following_count" + 1 WHERE "user_id" = NEW."source_user_id";
            RETURN NULL;
         ELSIF (TG_OP = 'DELETE') THEN    
            UPDATE "users" SET "following_count" = "following_count" - 1 WHERE "user_id" = NEW."source_user_id";
            RETURN NULL;
         END IF;  
     END;
$$;

CREATE TRIGGER followers_count_trigger AFTER INSERT OR DELETE ON followers FOR EACH ROW EXECUTE PROCEDURE followers_count();
CREATE TRIGGER following_count_trigger AFTER INSERT OR DELETE ON followers FOR EACH ROW EXECUTE PROCEDURE following_count();