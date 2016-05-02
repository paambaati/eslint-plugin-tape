import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-skip-assert';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const errors = [{ruleId: 'no-skip-assert'}];
const header = `const test = require('tape');\n`;

test(() => {
	ruleTester.run('no-skip-assert', rule, {
		valid: [
			header + 'test(t => { t.is(1, 1); });',
			header + 'test.skip(t => { t.is(1, 1); });',
			header + 'test(t => { notT.skip.is(1, 1); });',
			// shouldn't be triggered since it's not a test file
			'test(t => { t.skip.is(1, 1); });'
		],
		invalid: [
			{
				code: header + 'test(t => { t.skip.is(1, 1); });',
				errors
			},
			{
				code: header + 'test.skip(t => { t.skip.is(1, 1); });',
				errors
			}
		]
	});
});
