// @ts-check

const Path                 = require('path');
const HtmlWebPackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: [
            "./src/client/index.tsx",
            './src/client/index.scss'
        ]
    },
    
    output: {
        filename: "bundle.js",
        path: `${__dirname}./../../dist`
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js",  '.mjs', ".json"],
        alias: { 
            "@app":        relativePath("."),
            "@common":     relativePath("../common" ),
            "@components": relativePath("components"),
            "@reducers":   relativePath("reducers"  ),
            "@actions":    relativePath("actions"   ),
            "@theme":      relativePath("theme"     ),
            "@configs":    relativePath("configs"   ),
            "@services":   relativePath("services"  ),
            "@graphql":    relativePath("graphql"   )
        },
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader?configFileName=./src/client/tsconfig.json" 
            },

            
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/],
            },
            
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },

            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                    }, 
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: relativePath("index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // We want to avoid bundling all of React into the same file, since this 
    // increases compilation time and browsers will typically be able to cache 
    // a library if it doesn’t change.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
};


function relativePath(pathString) {
    return Path.resolve(__dirname, pathString);
}