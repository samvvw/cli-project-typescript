var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import url from 'url';
function parseArgumentsIntoOptions(rawArgs) {
    var args = arg({
        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,
        '-g': '--git',
        '-y': '--yes',
        '-i': '--install',
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    };
}
function promptForMissingOptions(options) {
    return __awaiter(this, void 0, void 0, function () {
        var getTemplateFiles, defaultTemplate, questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getTemplateFiles = function (source) {
                        return fs
                            .readdirSync(source, { withFileTypes: true })
                            .filter(function (dirent) { return dirent.isDirectory(); })
                            .map(function (dirent) {
                            return dirent.name.charAt(0).toUpperCase() + dirent.name.slice(1);
                        });
                    };
                    defaultTemplate = 'JavaScript';
                    if (options.skipPrompts) {
                        return [2 /*return*/, __assign(__assign({}, options), { template: options.template || defaultTemplate })];
                    }
                    questions = [];
                    if (!options.template) {
                        questions.push({
                            type: 'list',
                            name: 'template',
                            message: 'Please choose which project template to use',
                            choices: getTemplateFiles(path.resolve(url.fileURLToPath(import.meta.url), '../../templates')),
                            default: defaultTemplate,
                        });
                    }
                    if (!options.git) {
                        questions.push({
                            type: 'confirm',
                            name: 'git',
                            message: 'Initialize a git repository?',
                            default: false,
                        });
                    }
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, options), { template: options.template || answers.template, git: options.git || answers.git })];
            }
        });
    });
}
export function cli(args) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(chalk.green(figlet.textSync('Sam\nCLI', {
                        font: 'Isometric3',
                        horizontalLayout: 'default',
                        verticalLayout: 'default',
                        width: 80,
                        whitespaceBreak: true,
                    })));
                    options = parseArgumentsIntoOptions(args);
                    return [4 /*yield*/, promptForMissingOptions(options)
                        // console.log(options, 'after')
                    ];
                case 1:
                    // console.log(options, 'before')
                    options = _a.sent();
                    // console.log(options, 'after')
                    return [4 /*yield*/, createProject(options)];
                case 2:
                    // console.log(options, 'after')
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
