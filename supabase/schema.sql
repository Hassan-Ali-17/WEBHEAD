-- WEBHEAD Portfolio — Supabase Schema & Realtime Setup
-- Author: Hassan Ali Shah
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Messages Table for Real-Time Public Chat
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    avatar VARCHAR(50) DEFAULT 'miles' NOT NULL,
    content VARCHAR(500) NOT NULL,
    is_reported BOOLEAN DEFAULT FALSE NOT NULL
);

-- Index for fast ordering by creation time
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view messages
CREATE POLICY "Public messages are viewable by everyone" 
ON public.messages 
FOR SELECT 
USING (true);

-- RLS Policy: Visitors can insert messages with content constraints
CREATE POLICY "Public visitors can post messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (
    char_length(display_name) > 0 AND 
    char_length(display_name) <= 50 AND
    char_length(content) > 0 AND 
    char_length(content) <= 500
);

-- 3. Heart / Like Counter Table
CREATE TABLE IF NOT EXISTS public.site_stats (
    id TEXT PRIMARY KEY,
    count BIGINT DEFAULT 0 NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initialize like counter row if not present
INSERT INTO public.site_stats (id, count)
VALUES ('heart_likes', 0)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for site_stats
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read of like counter
CREATE POLICY "Public stats are viewable by everyone" 
ON public.site_stats 
FOR SELECT 
USING (true);

-- Atomic increment RPC function for likes
CREATE OR REPLACE FUNCTION increment_like()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_count BIGINT;
BEGIN
    UPDATE public.site_stats
    SET count = count + 1,
        updated_at = timezone('utc'::text, now())
    WHERE id = 'heart_likes'
    RETURNING count INTO new_count;
    
    RETURN new_count;
END;
$$;

-- 4. Enable Supabase Realtime Publication
-- Enables live WebSocket broadcasts when messages are inserted
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
