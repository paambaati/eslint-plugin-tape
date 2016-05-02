# Ensure no `test.only()` are present

It's easy to run only one test with `test.only()` and then forget about it. It's visible in the results, but still easily missed. Forgetting to remove `.only`, means only this one test in the whole file will run, and if not caught, can let serious bugs slip into your codebase.


## Fail

```js
import test from 'tape';

test.only('test 1', t => {
	t.pass();
});

// test 2 will not run
test('test 2', t => {
	t.pass();
});
```


## Pass

```js
import test from 'tape';

test('test 1', t => {
	t.pass();
});

// test 2 will run
test('test 2', t => {
	t.pass();
});
```
