import serve from 'rollup-plugin-serve';
import { babel } from "@rollup/plugin-babel";
const prod = !process.env.ROLLUP_WATCH;
export default [{
    input: './src/index.js',
    output: {
      file: './dist/smartcord.js',
      format: 'iife',
      name: 'smartcord',
      freeze: false, 
      sourcemap: false,
      compact: true,
    },
    plugins: [
        !prod && serve({
            contentBase: 'dist',
            port: 1234,
            headers: {
              'Access-Control-Allow-Origin': '*',
            }
          }),   
          babel({
            babelHelpers: "bundled",
            extensions: [".jsx"],
            presets: [["@babel/preset-react"]],
          }),
    ]
  }];
  