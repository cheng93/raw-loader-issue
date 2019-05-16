const path = require("path");
const fs = require("fs");
const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ExclusionRegexs = [/node_modules/];

const config = (env, argv) => {
    return {
        entry: {
            app: "./src/main.ts"
        },
        output: {
            path: path.join(__dirname, "./dist"),
            filename: "[name].js"
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".ts", ".js", ".html", ".css", ".scss"]
        },
        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loader: "@ngtools/webpack",
                    exclude: ExclusionRegexs
                },
                {
                    test: /\.html$/,
                    use: [{ loader: "raw-loader" }],
                    exclude: ExclusionRegexs
                },
                {
                    test: /\.scss$/,
                    use: [{ loader: "raw-loader" }, { loader: "sass-loader" }],
                    exclude: ExclusionRegexs
                }
            ]
        },
        optimization: {
            splitChunks: {
                chunks: "all",
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        priority: -10,
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new AngularCompilerPlugin({
                tsConfigPath: "./tsconfig.json",
                mainPath: "./src/main.ts",
                skipCodeGeneration: true
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ]
    };
};

module.exports = config;
