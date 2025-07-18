-- cariler tablosunun kolon yapısını alma sorgusu
SELECT 
    column_name as "Kolon Adı",
    data_type as "Veri Tipi",
    character_maximum_length as "Maksimum Uzunluk",
    is_nullable as "Null Değer Kabul Eder",
    column_default as "Varsayılan Değer"
FROM information_schema.columns 
WHERE table_name = 'cariler' 
ORDER BY ordinal_position;

-- Alternatif olarak daha detaylı bilgi için:
SELECT 
    c.column_name as "Kolon Adı",
    c.data_type as "Veri Tipi",
    c.character_maximum_length as "Maksimum Uzunluk",
    c.numeric_precision as "Sayısal Hassasiyet",
    c.numeric_scale as "Ondalık Basamak",
    c.is_nullable as "Null Değer Kabul Eder",
    c.column_default as "Varsayılan Değer",
    c.udt_name as "PostgreSQL Veri Tipi"
FROM information_schema.columns c
WHERE c.table_name = 'cariler' 
ORDER BY c.ordinal_position; 