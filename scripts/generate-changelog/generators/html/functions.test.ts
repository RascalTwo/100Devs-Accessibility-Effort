import { describe, it } from '@jest/globals';
import { REPOSITORY_URL } from '../../../constants';
import { SEVENTEENTH_COMMIT_INFOS } from '../../test-data';
import { generateHTMLForDateAndCommits } from './functions';

describe('generateHTMLForDateAndCommits', () => {
	it('should generate HTML for a given date and commits', () => {
		const day = '2024-03-17';

		const generatedHTML = generateHTMLForDateAndCommits(day, SEVENTEENTH_COMMIT_INFOS);

		expect(generatedHTML).toEqual(`        <li>
          <h2><time datetime="2024-03-17">${new Date(day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time></h2>

          <ul>
            <li>
              <a href="${REPOSITORY_URL}/commit/third-hash">Third Commit</a>
            </li>
            <li>
              <a href="${REPOSITORY_URL}/commit/second-hash">Second Commit</a>
            </li>
          </ul>
        </li>`);
	});
});
