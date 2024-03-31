import generateChangelogHTML from './html/index';
import generateChangelogMarkdown from './md/index';
import { generateFullChangelogHTML, generateHTMLForDateAndCommits } from './html/functions';
import { generateFullChangelogMarkdown, generateMarkdownForDateAndCommits } from './md/functions';
import { generateChangelogLIs } from '../functions';
import { COMMITS_BY_ISO_DAY } from '../test-data';

jest.mock('./html/functions');
jest.mock('./md/functions');
jest.mock('../functions');

describe.each([
	{
		name: 'HTML',
		indexGenerator: generateChangelogHTML,
		individualGenerator: generateHTMLForDateAndCommits,
		fullGenerator: generateFullChangelogHTML,
	},
	{
		name: 'Markdown',
		indexGenerator: generateChangelogMarkdown,
		individualGenerator: generateMarkdownForDateAndCommits,
		fullGenerator: generateFullChangelogMarkdown,
	},
])('generateChangelog%s', ({ name, indexGenerator, individualGenerator, fullGenerator }) => {
	it(`should call generateChangelogLIs with ${individualGenerator.name}, and join results with two newlines`, () => {
		const lis = ['first', 'second'];
		jest.mocked(generateChangelogLIs).mockReturnValueOnce(lis);
		const expectedResult = 'prefix\nfirst\n\nsecond\nsuffix';
		jest.mocked(fullGenerator).mockReturnValue(expectedResult);

		const result = indexGenerator(COMMITS_BY_ISO_DAY);

		expect(generateChangelogLIs).toHaveBeenCalledWith(COMMITS_BY_ISO_DAY, individualGenerator);
		expect(fullGenerator).toHaveBeenCalledWith(lis.join('\n\n'));
		expect(result).toEqual(expectedResult);
	});
});
