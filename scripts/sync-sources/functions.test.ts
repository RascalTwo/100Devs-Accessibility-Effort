import fs from 'node:fs';
import inquirer from 'inquirer';
import { promptMissingSources, removeExtraSources, parseEntries } from './functions';

jest.mock('fs');
jest.mock('inquirer');

describe('promptMissingSources', () => {
	it('should prompt for missing sources and update records', async () => {
		// @ts-expect-error TODO - properly type
		const inquirerPromptMock = jest.spyOn(inquirer, 'prompt').mockImplementation(() => {
			return Promise.resolve({ alt: 'alt3' });
		});
		const records = {
			url1: 'alt1',
			url2: 'alt2',
		};

		await promptMissingSources(records, [
			{ href: 'url1', textContent: '' },
			{ href: 'url3', textContent: '' },
		]);

		expect(inquirerPromptMock).toHaveBeenCalledTimes(1);
		expect(records).toEqual({
			url1: 'alt1',
			url2: 'alt2',
			url3: 'alt3',
		});
	});
});

describe('removeExtraSources', () => {
	it('should remove extra sources from records', () => {
		const records = {
			url1: 'alt1',
			url2: 'alt2',
			url3: 'alt3',
		};

		removeExtraSources(records, [
			{ href: 'url1', textContent: '' },
			{ href: 'url3', textContent: '' },
		]);

		expect(records).toEqual({
			url1: 'alt1',
			url3: 'alt3',
		});
	});
});

describe('parseEntries', () => {
	it('should parse entries from the HTML file', () => {
		jest
			.spyOn(fs, 'readFileSync')
			.mockReturnValueOnce(
				'<html><body><a href="https://example.com/">Link 1</a><a href="./resources/resource.txt" alt="Alt Text">Link 2</a></body></html>',
			);

		const entries = parseEntries();

		expect(entries).toEqual([
			{ href: 'https://example.com/', textContent: 'Link 1', alt: undefined },
			{
				href: './resources/resource.txt',
				textContent: 'Link 2',
				alt: 'Alt Text',
			},
		]);
	});
});
