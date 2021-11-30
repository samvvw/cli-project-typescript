import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './main'
import chalk from 'chalk'
import figlet from 'figlet'
import fs from 'fs'
import path from 'path'
import url from 'url'

export interface Options {
    skipPrompts: boolean
    git: boolean
    template: string
    runInstall: boolean
    templateDirectory?: string
    targetDirectory?: string
}

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    )
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
    }
}

async function promptForMissingOptions(options: Options) {
    const getTemplateFiles = (source: string) => {
        return fs
            .readdirSync(source, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map(
                (dirent) =>
                    dirent.name.charAt(0).toUpperCase() + dirent.name.slice(1)
            )
    }
    const defaultTemplate = 'JavaScript'
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        }
    }

    const questions = []
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: getTemplateFiles(
                path.resolve(
                    url.fileURLToPath(import.meta.url),
                    '../../templates'
                )
            ),
            default: defaultTemplate,
        })
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        })
    }

    if (!options.runInstall) {
        questions.push({
            type: 'confirm',
            name: 'runInstall',
            message: 'Install dependencies?',
            default: false,
        })
    }

    const answers: Options = await inquirer.prompt(questions)

    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        runInstall: options.runInstall || answers.runInstall,
    }
}

export async function cli(args: string[]) {
    console.log(
        chalk.green(
            figlet.textSync("Sam's\nAPP", {
                // font: 'Nancyj-Underlined',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                // whitespaceBreak: true,
            })
        )
    )
    let options = parseArgumentsIntoOptions(args)
    // console.log(options, 'before')
    options = await promptForMissingOptions(options)
    // console.log(options, 'after')
    await createProject(options)
}
