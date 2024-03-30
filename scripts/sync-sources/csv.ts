import fs from 'node:fs';
import { parse } from 'csv-parse';

/**
 * Loads a CSV file and returns its contents as a record of key-value pairs.
 * Throws an error if any value in the CSV file contains a comma.
 *
 * @param filepath - The path to the CSV file.
 * @returns A record object where the keys are the values in the "Resource" column and the values are the values in the "Source" column.
 * @throws An error if any value in the CSV file contains a comma.
 */
export async function loadCSV(filepath: string) {
	const parser = fs.createReadStream(filepath, 'utf-8').pipe(
		parse({
			columns: true,
			skip_empty_lines: true,
		}),
	);

	const records: Record<string, string> = {};
	for await (const record of parser) {
		records[record.Resource] = record.Source;
		if (Object.values<string>(record).some((value) => value.includes(','))) {
			throw new Error('Commas are not allowed in the values of the CSV file');
		}
	}
	return records;
}

/**
 * Saves the records as a CSV file at the specified filepath sorted by first column.
 *
 * @param filepath - The filepath where the CSV file will be saved.
 * @param records - The records to be saved as a CSV file.
 * @returns A promise that resolves when the CSV file is successfully saved.
 */
export async function saveCSV(filepath: string, records: Record<string, string>) {
	const entries = Object.entries(records).sort((a, b) => a[0].localeCompare(b[0]));

	const writeStream = fs.createWriteStream(filepath, 'utf-8');
	writeStream.write('Resource,Source');
	for (const record of entries) {
		writeStream.write(`\n${record.join(',')}`);
	}
}
