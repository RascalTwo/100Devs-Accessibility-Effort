import generateChangelogHTML from './index';
import { generateFullChangelogHTML, generateHTMLForDateAndCommits } from './functions';
import { generateChangelogLIs } from '../../functions';
import { COMMITS_BY_ISO_DAY } from '../../test-data';

jest.mock('./functions');
jest.mock('../../functions');

describe('generateChangelogHTML', () => {
	it('should call generateChangelogLIs with generateHTMLForDateAndCommits, and join results with two newlines', () => {
		const lis = ['first', 'second'];
		jest.mocked(generateChangelogLIs).mockReturnValueOnce(lis);
		const html = '<html>first\n\nsecond</html>';
		jest.mocked(generateFullChangelogHTML).mockReturnValue(html);

		const result = generateChangelogHTML(COMMITS_BY_ISO_DAY);

		expect(generateChangelogLIs).toHaveBeenCalledWith(COMMITS_BY_ISO_DAY, generateHTMLForDateAndCommits);
		expect(generateFullChangelogHTML).toHaveBeenCalledWith(lis.join('\n\n'));
		expect(result).toEqual(html);
	});
});
