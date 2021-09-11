Step 1.>
CREATE DATABASE birthdaybash;

Step 2.>
SET TIMEZONE='Asia/Kolkata'; //this is for local setup 
SET TIMEZONE='UTC'; // this will be used in production

Step 3.>
\c birthdaybash ;   -- to connect to database

Step 4.>
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

Step 5.>
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE NOT NULL,
    id SERIAL ,
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    dob TIMESTAMPTZ NOT NULL,
    gender VARCHAR(10) NOT NULL,
    bio VARCHAR(100) ,
    followers_count BIGINT DEFAULT 0,
    following_count BIGINT DEFAULT 0

);

Step 6.>   
CREATE TABLE followers (
    id SERIAL,
    source_user_id UUID REFERENCES users(user_id),
    dest_user_id  UUID REFERENCES users(user_id)
);

CREATE TABLE edits(
    user_id UUID REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL
);


CREATE TABLE wishes(
    source_user_id UUID REFERENCES users(user_id),
    dest_user_id UUID REFERENCES users(user_id)
);

-- For Seaching Feature 
Step 7.>
CREATE INDEX CONCURRENTLY idx_user ON users(id,username,dob); 

CREATE INDEX CONCURRENTLY idx_followers ON followers(id,source_user_id,dest_user_id);

CREATE INDEX CONCURRENTLY idx_edits ON edits(user_id);

CREATE INDEX CONCURRENTLY idx_wishes ON wishes(source_user_id,dest_user_id);

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