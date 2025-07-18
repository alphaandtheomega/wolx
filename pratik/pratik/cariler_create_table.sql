-- cariler tablosunun CREATE TABLE komutunu alma
SELECT 
    'CREATE TABLE cariler (' ||
    string_agg(
        column_name || ' ' || 
        data_type || 
        CASE 
            WHEN character_maximum_length IS NOT NULL 
            THEN '(' || character_maximum_length || ')'
            WHEN numeric_precision IS NOT NULL AND numeric_scale IS NOT NULL
            THEN '(' || numeric_precision || ',' || numeric_scale || ')'
            WHEN numeric_precision IS NOT NULL
            THEN '(' || numeric_precision || ')'
            ELSE ''
        END ||
        CASE WHEN is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END ||
        CASE WHEN column_default IS NOT NULL THEN ' DEFAULT ' || column_default ELSE '' END,
        ', '
        ORDER BY ordinal_position
    ) ||
    ');' as create_table_statement
FROM information_schema.columns 
WHERE table_name = 'cariler';

-- Daha basit versiyon (sadece kolon adları ve tipleri):
SELECT 
    'CREATE TABLE cariler (' ||
    string_agg(
        column_name || ' ' || data_type,
        ', '
        ORDER BY ordinal_position
    ) ||
    ');' as simple_create_statement
FROM information_schema.columns 
WHERE table_name = 'cariler'; 