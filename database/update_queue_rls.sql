-- Allow public to read queue tokens so they can see live queue status
DROP POLICY IF EXISTS "Public read queue_tokens" ON queue_tokens;
CREATE POLICY "Public read queue_tokens" ON queue_tokens
  FOR SELECT USING (true);

-- Allow public to select from patients (needed if checking token ownership/names publicly)
DROP POLICY IF EXISTS "Public read patients" ON patients;
CREATE POLICY "Public read patients" ON patients
  FOR SELECT USING (true);


