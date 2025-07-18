// Node.js ile cariler tablosunun yapısını alma
import { getConnection } from './b/db.js';

async function getCarilerTableStructure() {
  try {
    const connection = await getConnection();
    
    // Tablo yapısını al
    const result = await connection.query(`
      SELECT 
        column_name as "Kolon Adı",
        data_type as "Veri Tipi",
        character_maximum_length as "Maksimum Uzunluk",
        is_nullable as "Null Değer Kabul Eder",
        column_default as "Varsayılan Değer"
      FROM information_schema.columns 
      WHERE table_name = 'cariler' 
      ORDER BY ordinal_position
    `);
    
    console.log('=== CARİLER TABLOSU YAPISI ===');
    console.table(result.rows);
    
    // CREATE TABLE komutunu al
    const createTableResult = await connection.query(`
      SELECT 
        'CREATE TABLE cariler (' ||
        string_agg(
          column_name || ' ' || data_type,
          ', '
          ORDER BY ordinal_position
        ) ||
        ');' as create_statement
      FROM information_schema.columns 
      WHERE table_name = 'cariler'
    `);
    
    console.log('\n=== CREATE TABLE KOMUTU ===');
    console.log(createTableResult.rows[0].create_statement);
    
    await connection.end();
    
  } catch (error) {
    console.error('Hata:', error);
  }
}

// Fonksiyonu çalıştır
getCarilerTableStructure(); 