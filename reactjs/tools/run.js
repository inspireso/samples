/*
 * Copyright (c) 2023, inspireso.org
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console, global-require */

const tasks = new Map(); // The collection of automation tasks ('clean', 'build', 'publish', etc.)

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(task, options) {
  const start = new Date();
  console.log(
      `[${format(start)}] Starting '${task}${options ? `(${options})` : ''}'...`
  );

  return Promise.resolve()
      .then(() => tasks.get(task)())
      .then(() => {
        const end = new Date();
        const time = end.getTime() - start.getTime();
        console.log(
            `[${format(end)}] Finished '${task}${options ? `(${options})` : ''}' after ${time} ms`
        );
      })
      .catch(err => {
        console.error(err.stack);
      });
}

//
// Clean up the output directory
//
tasks.set('clean', () => {
  return require('./clean');
});

//
// Copy JavaScript, CSS and image files to remove server by scp
// -----------------------------------------------------------------------------
tasks.set('copy', () => {
  return require('./deploy').copy();
});


//
// Copy JavaScript, CSS and image files to remove server by scp
// -----------------------------------------------------------------------------
tasks.set('config', () => {
  return require('./deploy').config();
});

//
// Copy main program to remove server by scp, then restart service
// -----------------------------------------------------------------------------
tasks.set('deploy', () => {
  return require('./deploy').deploy();
});

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', () => {
  return require('./bundle');
});

//
// Start a dev server
// -----------------------------------------------------------------------------
tasks.set('server', () => {
  return require('./server');
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  return Promise.resolve()
      .then(() => run('clean'))
      .then(() => run('bundle'))
    ;
});

//
// Build and publish the website
// -----------------------------------------------------------------------------
tasks.set('publish', () => {
  return run('build')
      .then(() => run('copy'));

});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () => {
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  return run('clean')
      .then(() => run('server'))
      ;
});

// Execute the specified task or default one. E.g.: node run build
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start' /* default */);
