import { describe, it } from '@jest/globals';
import { REPOSITORY_URL } from '../../../constants';
import { SEVENTEENTH_COMMIT_INFOS } from '../../test-data';
import { generateMarkdownForDateAndCommits } from './functions';

describe('generateMarkdownForDateAndCommits', () => {
	it('should generate Markdown for a given date and commits', () => {
		const day = '2024-03-17';

		const generatedMarkdown = generateMarkdownForDateAndCommits(day, SEVENTEENTH_COMMIT_INFOS);

		expect(generatedMarkdown)
			.toEqual(`## ${new Date(day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

- [Third Commit](${REPOSITORY_URL}/commit/third-hash)
- [Second Commit](${REPOSITORY_URL}/commit/second-hash)`);
	});
});
