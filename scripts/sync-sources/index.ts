import { loadCSV, saveCSV } from "./csv";
import { parseEntries, removeExtraSources, promptMissingSources } from "./functions";

/**
 * Main function that synchronizes the sources.
 *
 * Loads the CSV file, parses the entries, removes extra sources,
 * prompts for missing sources, and saves the updated CSV file.
 */
async function main() {
	const filepath = "../SOURCES.csv";

	const records = await loadCSV(filepath);
	const entries = parseEntries();
	removeExtraSources(records, entries);
	await promptMissingSources(records, entries);
	await saveCSV(filepath, records);
}

if (require.main === module) {
	main().catch((error) => {
		console.error(error);
		process.exit(1);
	});
}