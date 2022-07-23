import pkg from '@hon2a/less-vars-to-js';
import fs from 'fs';

const keeps = [
    'btn-text-hover-bg','card-skeleton-bg', 'text-color-secondary',
    'disabled-color','shadow-color','table-border-color','tooltip-bg'
];

const { loadAndResolveLessVars } = pkg;
const light = await loadAndResolveLessVars('node_modules/antd/lib/style/themes/default.less', { 
    javascriptEnabled: true});
const dark = await loadAndResolveLessVars('node_modules/antd/lib/style/themes/dark.less',  { 
    javascriptEnabled: true });
const same = Object.keys(light).filter( key => key !== 'functions' && light[key] === dark[key] ).concat(keeps);
const diff = Object.keys(light).filter( key => light[key] !== dark[key] ).filter(key=>!keeps.includes(key));

console.log( `Same value count: ${same.length}`);
fs.writeFileSync( 'src/asserts/same.vars.less', same.map( key=> `@${key}:${light[key]};`).join('\n')); 

console.log( `Diff value count: ${diff.length}`);

const getKey = (key) => `--ant-${key}`;

const result = [':root {'].concat(
            diff.map( key=> `      ${getKey(key)}:${light[key]};`)
        ).concat([ '}', ':dark {']).concat(
            diff.map( key=> `      ${getKey(key)}:${dark[key]};`)
        ).concat( ['}']).concat(
            diff.map( key=> `@${key}:  var(${getKey(key)});`)
        )
        .join('\n');

fs.writeFileSync( 'src/asserts/variables.less', result ); 
//fs.writeFileSync( 'src/asserts/dark.vars.less', diff.map( key=> `@${key}:${dark[key]};`).join('\n')); 

/**
ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/style/themes/variable.less on line 19, column 42:
18   --@{ant-prefix}-primary-color-active: color(~`colorPalette('@{base-primary}', 7) `);
19   --@{ant-prefix}-primary-color-outline: fade(@base-primary, @outline-fade);
20 

SyntaxError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/date-picker/style/status.less on line 32, column 5:
31   &-status-error {
32     .picker-status-color(@error-color, @error-color, @input-bg, @error-color-hover, @error-color-outline);
33   }

RuntimeError: Error evaluating function `shade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/notification/style/index-pure.less on line 134, column 18:
133         & when not (@theme = dark) {
134           color: shade(@text-color-secondary, 40%);
135         }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
NameError: variable @notification-hover-color is undefined in /home/ubuntu/myapp/node_modules/antd/lib/notification/style/index-pure.less on line 134, column 18:
133         & when not (@theme = dark) {
134           color: @notification-hover-color;
135         }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
NameError: variable @shade is undefined in /home/ubuntu/myapp/src/asserts/variables.less on line 1318, column 26:
1317 @gradient-max: #ffffff;
1318 @notification-hover-color: @shade(@text-color-secondary, 40%);

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `shade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/src/asserts/variables.less on line 1318, column 28:
1317 @gradient-max: #ffffff;
1318 @notification-hover-color: shade(@text-color-secondary, 40%);

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/switch/style/index-pure.less on line 30, column 27:
29     outline: 0;
30     box-shadow: 0 0 0 2px fade(@disabled-color, 10%);
31   }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
SyntaxError: @switch-focus-box-color rule is missing block or ending semi-colon in /home/ubuntu/myapp/src/asserts/variables.less on line 1319, column 24:
1318 @notification-hover-color: shade(rgba(0, 0, 0, 0.45), 40%);  //@text-color-secondary
1319 @switch-focus-box-color: fade(rgba(0, 0, 0, 0.25), 10%)  //disabled-color

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/switch/style/index-pure.less on line 30, column 27:
29     outline: 0;
30     box-shadow: 0 0 0 2px fade(@disabled-color, 10%);
31   }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `darken`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/table/style/index-pure.less on line 675, column 43:
674       &::before {
675         box-shadow: inset 10px 0 8px -8px darken(@shadow-color, 5%);
676       }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `darken`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/table/style/index-pure.less on line 694, column 44:
693       &::after {
694         box-shadow: inset -10px 0 8px -8px darken(@shadow-color, 5%);
695       }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `lighten`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/table/style/index-pure.less on line 717, column 19:
716       align-items: center;
717       background: lighten(@table-border-color, 80%);
718       border-top: 1px solid @table-border-color;

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/tabs/style/position.less on line 41, column 45:
40           left: 0;
41           box-shadow: inset 10px 0 8px -8px fade(@shadow-color, 8%);
42         }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fade`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/tabs/style/position.less on line 125, column 45:
124           top: 0;
125           box-shadow: inset 0 10px 8px -8px fade(@shadow-color, 8%);
126         }

ubuntu@primary:~/myapp$ lessc --js src/asserts/default.less myvariable.css
RuntimeError: Error evaluating function `fadeout`: Argument cannot be evaluated to a color in /home/ubuntu/myapp/node_modules/antd/lib/tooltip/style/index-pure.less on line 87, column 9:
86         to right bottom,
87         fadeout(@tooltip-bg, 10%),
88         @tooltip-bg

 */
