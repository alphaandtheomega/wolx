import { getConnection } from "../../db.js";

export const getAllUlkeler = async (req, res) => {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query('SELECT * FROM ulkeler ORDER BY "UlkelerID" ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Ülkeler alınırken hata:', error);
    res.status(500).json({ message: 'Ülkeler alınırken bir hata oluştu' });
  }
}; 