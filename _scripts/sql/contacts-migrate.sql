ALTER TABLE contacts ADD COLUMN IF NOT EXISTS interest text DEFAULT ''::text;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS learner_type text DEFAULT ''::text;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS message text DEFAULT ''::text;
