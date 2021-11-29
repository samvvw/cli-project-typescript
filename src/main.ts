import chalk from 'chalk'
import figlet from 'figlet'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'
import Configstore from 'configstore'
import { Options } from './cli'

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options: Options) {
    if (options.templateDirectory && options.targetDirectory) {
        return copy(options.templateDirectory, options.targetDirectory, {
            clobber: false,
        })
    }
}
async function initGit(options: Options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    })
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize git'))
    }
    return
}

export async function createProject(options: Options) {
    // console.log(path.join(process.cwd(), 'thisfile'), 'targettt')

    const packageJson = JSON.parse(
        fs.readFileSync(
            path.resolve(
                fileURLToPath(import.meta.url),
                '../..',
                './package.json'
            ),
            'utf8'
        )
    )

    const config = new Configstore(packageJson.name)

    config.set('cli', 'uuuuj')

    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    }

    const currentFileUrl = import.meta.url
    const templateDir = path.resolve(
        fileURLToPath(currentFileUrl),
        '../../templates',
        options.template.toLowerCase()
    )
    // console.log(
    //     path.resolve(fileURLToPath(import.meta.url), '../..', 'othre'),
    //     'currentFile'
    // )
    if (!fs.existsSync(path.join(process.cwd(), 'thisfile'))) {
        console.log('aaaa')
        fs.mkdirSync(path.join(process.cwd(), 'thisfile'), { recursive: true })
    }
    options.templateDirectory = templateDir

    try {
        await access(templateDir, fs.constants.R_OK)
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'))
        process.exit(1)
    }

    const tasks = new Listr([
        {
            title: 'Copy project files',
            task: () => copyTemplateFiles(options),
        },
        {
            title: 'Initialize git',
            task: () => initGit(options),
            enabled: () => options.git,
        },
        {
            title: 'Install dependencies',
            task: () => {
                return projectInstall({
                    cwd: options.targetDirectory,
                })
            },
            enabled: () => options.runInstall,
            // skip: () => {
            //     return !options.runInstall
            //         ? 'Pass --install automatically install dependencies'
            //         : undefined
            // },
        },
    ])

    // console.log('Copy project files')
    // await copyTemplateFiles(options)

    await tasks.run()
    console.log(
        chalk.green(
            figlet.textSync('DONE \n\nProject Ready', {
                font: 'Isometric3',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true,
            })
        )
    )
    return true
}
