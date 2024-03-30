import { loadCSV, saveCSV } from './csv';
import fs from 'node:fs';
import os from 'node:os';

const TEST_FILEPATH = `${os.tmpdir()}/test-file-${Date.now()}.csv`;
beforeEach(async () => {
	await fs.promises.writeFile(TEST_FILEPATH, 'You forgot to write test content!');
});
afterAll(async () => {
	await fs.promises.unlink(TEST_FILEPATH).catch(() => {});
});

describe('loadCSV', () => {
	it('should load and parse CSV file correctly', async () => {
		await fs.promises.writeFile(
			TEST_FILEPATH,
			'Resource,Source\nResource1,Source1\nResource2,Source2\nResource3,Source3',
		);

		const records = await loadCSV(TEST_FILEPATH);

		expect(records).toEqual({
			Resource1: 'Source1',
			Resource2: 'Source2',
			Resource3: 'Source3',
		});
	});

	it('should throw an error if CSV file contains commas in values', async () => {
		await fs.promises.writeFile(
			TEST_FILEPATH,
			'Resource,Source\nResource1,Source1\nResource2,"Source2,With,Commas"\nResource3,Source3',
		);

		await expect(loadCSV(TEST_FILEPATH)).rejects.toThrow('Commas are not allowed in the values of the CSV file');
	});
});

describe('saveCSV', () => {
	it('should save records to CSV file correctly', async () => {
		await saveCSV(TEST_FILEPATH, {
			Resource2: 'Source2',
			Resource1: 'Source1',
			Resource3: 'Source3',
		});

		expect(await fs.promises.readFile(TEST_FILEPATH, 'utf-8')).toEqual(
			'Resource,Source\nResource1,Source1\nResource2,Source2\nResource3,Source3',
		);
	});
});
