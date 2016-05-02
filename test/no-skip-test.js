import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-skip-test';

const ruleTester = new RuleTester({
	env: {
		es6: true
	}
});

const errors = [{ruleId: 'no-skip-test'}];
const header = `const test = require('tape');\n`;

test(() => {
	ruleTester.run('no-skip-test', rule, {
		valid: [
			header + 'test("my test name", t => { t.pass(); });',
			header + 'test(t => { t.pass(); }); test(t => { t.pass(); });',
			header + 'test(t => { t.skip.is(1, 2); });',
			header + 'notTest.skip();',
			// shouldn't be triggered since it's not a test file
			'test.skip(t => {});'
		],
		invalid: [
			{
				code: header + 'test.skip(t => { t.pass(); });',
				errors
			}
		]
	});
});
