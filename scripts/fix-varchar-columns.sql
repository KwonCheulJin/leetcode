-- VARCHAR(100) 길이 제한 문제 해결
-- time_complexity와 space_complexity 컬럼을 TEXT로 변경

ALTER TABLE leetcode_problems 
ALTER COLUMN time_complexity TYPE TEXT;

ALTER TABLE leetcode_problems 
ALTER COLUMN space_complexity TYPE TEXT;