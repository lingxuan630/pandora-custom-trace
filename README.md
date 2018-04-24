# pandora-custom-trace
a custom trace module for [pandora](https://github.com/midwayjs/pandora/)


### get start
```
npm install pandora-custom-trace
```

or 
```
yarn add pandora-custom-trace
```

### usage
```
const { report } = require('pandora-custom-trace');

report('custom', {
  'log': {
     value: 'hello world',
     type: 'string'
  }
})
```

### api

report(spanName, tags);

name | type | default | description
--- | --- |--- | ---
spanName | string | "custom" | span name for a trace
tags | object | null | tags object

more about trace, please visit  http://www.midwayjs.org/pandora/zh-cn/introduce.html
