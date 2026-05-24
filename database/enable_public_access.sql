-- Allow public/anonymous read access to departments
DROP POLICY IF EXISTS "Public read departments" ON departments;
CREATE POLICY "Public read departments" ON departments
  FOR SELECT USING (true);

-- Allow public/anonymous read access to doctors
DROP POLICY IF EXISTS "Public read doctors" ON doctors;
CREATE POLICY "Public read doctors" ON doctors
  FOR SELECT USING (true);

-- Allow public insert for patients (registration)
DROP POLICY IF EXISTS "Public insert patients" ON patients;
CREATE POLICY "Public insert patients" ON patients
  FOR INSERT WITH CHECK (true);
