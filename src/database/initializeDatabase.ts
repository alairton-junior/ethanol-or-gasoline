import { type SQLiteDatabase } from 'expo-sqlite' 

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS gas_stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ethanol_value REAL NOT NULL,
            gasoline_value REAL NOT NULL,
            latitude TEXT,
            longitude TEXT
        )
    `);

} 



