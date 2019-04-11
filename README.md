# with-interval.js

任意の関数を、インターバルを空けて実行されるようにラップする関数。

## 使い方
```
const withInterval = require('with-interval');

const f = withInterval(console.log);
f.interval = 1000;
f(1), f(2), f(3);	// 1秒ごとに、1, 2, 3 が出力される。

f.interval = () => Math.random() * 10000;
f(1), f(2), f(3);	// 10秒未満のランダムな時間ごとに、1, 2, 3 が出力される。
```
