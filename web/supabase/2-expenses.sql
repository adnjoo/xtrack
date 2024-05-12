CREATE TABLE expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount VARCHAR(255) DEFAULT '0',
    category VARCHAR(255),
    description VARCHAR(255),
    date VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
);