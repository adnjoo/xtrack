CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title TEXT,
    done BOOLEAN DEFAULT FALSE,
    done_date TIMESTAMP WITH TIME ZONE,
    position INTEGER,
    points INTEGER
);