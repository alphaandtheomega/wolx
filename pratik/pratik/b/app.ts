import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import db, {
  updateDbNameByUsername,
  getConnection,
  closeConnection,
} from "./db.js";
import fs from "fs"; // File system modülünü ekledim
import pg from 'pg';
import cookieParser from 'cookie-parser';

// Express Request tipini genişlet
declare global {
  namespace Express {
    interface Request {
      db?: pg.Client | null;
    }
  }
}
//ROUTELARI BURAYA ALALIM
import userRoutes from './routes/userRoutes.js';
import parametreRoutes from "./routes/Ayarlar/parametreRoutes.js";
import modulRoutes from "./routes/modulRoutes.js";
import cariRoutes from "./routes/Cari/cariRoutes.js";
import ilRoutes from './routes/UtilRoutes/ilRoutes.js';
import ilceRoutes from './routes/UtilRoutes/ilceRoutes.js';
import ulkeRoutes from './routes/Cari/ulkeRoutes.js';
import cariGrupKoduRoutes from './routes/Cari/cariGrupKoduRoutes.js';
import cariHareketleriRoutes from "./routes/Cari/cariHareketleriRoutes.js";


// __dirname değişkenini ESM için tanımla
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Saat dilimini ayarla
process.env.TZ = 'Europe/Istanbul';

// .env dosyasını ortama göre yükle (eğer db.js'den önce çalıştırılırsa)
const envPath = path.join(
  __dirname,
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3002; // Portu 3002 olarak değiştirdim

// Ortam bilgisini loglama
console.log(
  `[${new Date().toISOString()}] Uygulama ${
    process.env.NODE_ENV || "development"
  } ortamında başlatılıyor`
);
console.log(`[${new Date().toISOString()}] Port: ${PORT}`);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://pratik.volkankok.dev',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Veritabanı bağlantısı kontrolü için middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  // Async işlemi Promise wrapper ile çevrele
  (async () => {
    // API isteklerini kontrol et
    if (
      req.path.startsWith("/api/") &&
      req.path !== "/api/login" &&
      req.path !== "/api/logout" &&
      req.path !== "/api/db-status"
    ) {
      try {
        // Bağlantıyı kontrol et ve gerekirse yeniden bağlan
        console.log(
          `[${new Date().toISOString()}] API isteği: ${req.method} ${req.path}`
        );

        // İstek bilgilerini ve veritabanı durumunu kontrol et
        req.db = await getConnection();

        if (!req.db) {
          console.error(
            `[${new Date().toISOString()}] Veritabanı bağlantısı bulunamadı: ${
              req.method
            } ${req.path}`
          );
          return res.status(503).json({
            message:
              "Veritabanı bağlantısı bulunamadı. Lütfen tekrar giriş yapın.",
            error: "NO_DB_CONNECTION",
          });
        }

        // Veritabanı bağlantı durumunu kontrol et
        try {
          // Test sorgusu ile bağlantıyı kontrol et
          const testResult = await req.db.query(
            "SELECT current_database() as current_db"
          );
          console.log(
            `[${new Date().toISOString()}] API isteği için bağlantı kontrolü (${
              req.path
            }): Bağlantılı veritabanı = ${testResult.rows[0].current_db}`
          );
        } catch (testError) {
          console.error(
            `[${new Date().toISOString()}] Veritabanı bağlantı testi başarısız:`,
            testError
          );
          return res.status(500).json({
            message:
              "Veritabanı bağlantısı test edilemedi. Lütfen tekrar giriş yapın.",
            error: "DB_TEST_FAILED",
          });
        }
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Veritabanı bağlantısı kontrolü sırasında hata:`,
          error
        );
        return res.status(500).json({
          message: "Veritabanı bağlantısı sağlanamadı",
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    next();
  })().catch(next);
});

//Pratik route'larını ekle

app.use('/api', userRoutes);
app.use("/api/ayarlar/parametreler", parametreRoutes);
app.use("/api/moduller", modulRoutes);

app.use("/api/cariler", cariRoutes);
app.use('/api/iller', ilRoutes);
app.use('/api/ilceler', ilceRoutes);
app.use('/api/ulkeler', ulkeRoutes);
app.use('/api/carigrupkodlari', cariGrupKoduRoutes);
app.use("/api/carihareketleri", cariHareketleriRoutes);


app.get('/api/test', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server ${PORT} portunda çalışıyor (${process.env.NODE_ENV || 'development'} ortamı)`);
});

export default app;