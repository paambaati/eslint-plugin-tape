# Ensure no assertions are skipped

It's easy to make an assertion skipped with `t.skip.xyz()` and then forget about it.


## Fail

```js
import test from 'tape';

test('some title', t => {
	t.skip.is(1, 1);
});
```


## Pass

```js
import test from 'tape';

test('some title', t => {
	t.is(1, 1);
});
```
