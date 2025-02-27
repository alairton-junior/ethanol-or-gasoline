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

    async function update(id: number, data: Omit<GasStationDatabase, "id" | "created_at">) {
        const statement = await database.prepareAsync(
            `UPDATE gas_stations SET name = $name, ethanol_value = $ethanol_value, gasoline_value = $gasoline_value WHERE id = $id`
        );
        try {
            await statement.executeAsync({
                $id: id,
                $name: data.name,
                $ethanol_value: data.ethanol_value,
                $gasoline_value: data.gasoline_value
            });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function remove(id: number) {
        const statement = await database.prepareAsync(
            `DELETE FROM gas_stations WHERE id = $id`
        );
        try {
            await statement.executeAsync({ $id: id });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }
    
    return { create, list, update, remove }
}