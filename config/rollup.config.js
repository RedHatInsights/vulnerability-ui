/* eslint-disable camelcase */
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { dependencies, peerDependencies, devDependencies, name } from '../package.json';
import { createFilter } from '@rollup/pluginutils';
import image from '@rollup/plugin-image';

const externalDeps = Object.keys({ ...dependencies, ...peerDependencies, ...devDependencies }).map(item =>
    (
        item.includes('@patternfly') ||
        item.includes('@redhat-cloud-services'),
        item.includes('lodash')
    ) &&
    !item.includes('@patternfly/react-table') ?
        `${item}/**` :
        item
);

const external = createFilter(
    externalDeps,
    null,
    { resolve: false }
);

const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'prop-types',
    '@patternfly/react-core': '@patternfly/react-core',
    '@patternfly/react-icons': '@patternfly/react-icons',
    '@patternfly/react-table': '@patternfly/react-table',
    '@redhat-cloud-services/frontend-components': '@redhat-cloud-services/frontend-components',
    lodash: 'lodash',
    moment: 'moment'
};

const commonjsOptions = {
    ignoreGlobal: true,
    include: /node_modules/
};

const babelOptions = {
    exclude: /node_modules/,
    runtimeHelpers: true,
    configFile: './babel.config'
};

const plugins = [
    nodeResolve({
        browser: true
    }),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals(),
    terser({
        keep_classnames: true,
        keep_fnames: true
    }),
    postcss({
        extract: true
    }),
    image(),
    json()
];

export default [
    ...['esm', 'cjs'].map(env => ({
        input: {
            index: 'src/index.js'
        },
        output: {
            dir: `./dist/${env}`,
            format: env,
            name,
            globals,
            exports: 'named'
        },
        external,
        plugins
    })),
    ...Object.entries({
        index: 'src/index.js'
    }).map(([key, input]) => ({
        input,
        output: {
            file: `./dist/${key}.js`,
            format: 'umd',
            name: `${name}-${key}`,
            globals,
            exports: 'named'
        },
        external,
        plugins
    }))
];
