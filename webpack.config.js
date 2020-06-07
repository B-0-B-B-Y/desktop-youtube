import webpack from 'webpack'
import path from 'path'
import { spawn } from 'child_process'

const defaultInclude = path.resolve(__dirname, 'app')