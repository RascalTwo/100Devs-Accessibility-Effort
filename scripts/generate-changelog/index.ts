import fs from 'node:fs';
import { generateChangelogContentLIs, getGitLog, groupCommitInfoByIsoDay, parseGitLog } from './functions';
import { generateFullChangelogHTML } from './html-generators';

/**
 * Generates a changelog by retrieving git log, parsing the commits, grouping them by ISO day,
 * generating changelog content list items, and writing the full changelog HTML to a file.
 */
export function main() {
	const gitLog = getGitLog();
	const commits = parseGitLog(gitLog);
	const commitsByIsoDay = groupCommitInfoByIsoDay(commits);
	const lis = generateChangelogContentLIs(commitsByIsoDay);
	const fullChangelogHTML = generateFullChangelogHTML(lis.join('\n\n'));
	fs.writeFileSync('../website/changelog.html', fullChangelogHTML);
}

if (require.main === module) {
	main();
}
