const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (env) => {
  const { mode } = env
  const isDev = mode === 'development'

  return {
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      },
      // 解决以下情况不清除缓存问题：
      // 升级webpack插件
      // 更改webpack配置
      // 通过命令行传入不同的构建参数
      // loader、plugin或第三方包更新
      // Node.js、npm、yarn、pnpm等更新
      version: '0.0.0.1'
    },
    devtool: isDev ? 'eval-cheap-source-map' : 'nosources-source-map',
    entry: {
      index: {
        import: './src/pages/index/index.ts'
      },
      chart: {
        import: './src/pages/chart/index.ts'
      }
    },
    devServer: {
      hot: true,
      static: './dist',
      compress: true
    },
    mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            }
          ],
          exclude: /\/dist/
        },
        {
          test: /\.styl(us)?$/,
          oneOf: [
            // 这里匹配 `<style module>`
            {
              resourceQuery: /module/,
              use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { modules: true }
                },
                'postcss-loader',
                'stylus-loader'
              ]
            },
            {
              use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'stylus-loader'
              ]
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[hash][ext][query]'
          }
        },
        {
          test: /\.webmanifest$/i,
          type: 'asset/resource'
        }
      ]
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      clean: true,
      asyncChunks: true,
      assetModuleFilename: 'assets/[name][ext]'
    },
    // 代码分片，配合DllPlugin使用
    optimization: {
      splitChunks: {
        // 工作模式，值有三种可能，async：提取异步chunk，initial：只对入口文件生效，all：同时开启两种模式
        chunks: 'all',
        // 多大的chunk需要独立打包
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        // 按需加载时的最大并行请求数
        maxAsyncRequests: 30,
        // 入口点的最大并行请求数
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        // 分离规则
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendors'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    // 将webpack的chunk大小限制改为512kb
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: [
      new ESLintPlugin(),
      // 提取出css
      // eslint-disable-next-line multiline-ternary
      isDev ? null : new MiniCssExtractPlugin({
        // 配置同步加载输出文件名
        filename: 'css/[name].[contenthash].css',
        // 配置异步加载输出文件名
        chunkFilename: 'css/[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        title: '首页',
        favicon: path.resolve('favicon.ico'),
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'chart.html',
        title: '报表',
        favicon: path.resolve('favicon.ico'),
        chunks: ['chart']
      }),
      new BundleAnalyzerPlugin({
        // 开发模式下不启用打包分析（或者可以改成static启用静态分析）
        // analyzerMode: isDev ? 'disabled' : 'static',
        analyzerMode: 'disabled',
        analyzerPort: 44454
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            to: 'public'
          },
          path.posix.join(
            path.resolve(__dirname).replace(/\\/g, '/'),
            'manifest.webmanifest'
          )
        ]
      }),
      new VueLoaderPlugin(),
      // https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/
      isDev
        ? null
        : new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 512000000
        }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(mode)
      })
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.js']
    },
    stats: {
      children: true
    }
  }
}