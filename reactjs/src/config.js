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

// TODO: Update configuration settings

var path = require('path');
var port = process.env.PORT || 80;
var host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
var jar = path.resolve(__dirname, '../../spring-boot-demo/target/bootstrap.jar');

var config = {
    port: port,
    host: host,
    proxy: 'http://localhost:8081',

    url: `http://${host}`, // Your website URL
    title: 'DEMO',        // Your website title

    // 打包入口文件
    // The entry point for the bundle
    entry: {
      manage: './manage.jsx'
    },

    //配置部署环境
    deploy: {
    }
  }
  ;

module.exports = config;
