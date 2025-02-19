import { useSQLiteContext } from "expo-sqlite"

export type GasStationDatabase = {
    id: number
    name: string
    created_at: string
    ethanol_value: number
    gasoline_value: number
}

export function useGasStationDatabase() {
    const database = useSQLiteContext()

    async function create(data: Omit<GasStationDatabase, "id" | "created_at">) {
        const statement = await database.prepareAsync(
            `INSERT INTO gas_stations (name, ethanol_value, gasoline_value) VALUES ($name, $ethanol_value, $gasoline_value)`
        )
        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $ethanol_value: data.ethanol_value,
                $gasoline_value: data.gasoline_value
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function list() {
        try {
          const query = 'SELECT * FROM gas_stations';
          const response = await database.getAllAsync<GasStationDatabase>(query);

          return response;

        } catch (error) {
          
            throw error;
        }
    }
    
    return { create, list }
}