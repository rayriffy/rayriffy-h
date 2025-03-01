import fs from 'fs'
import path from 'path'
import { destr } from 'destr'

/**
 * Read and parse a JSON file from the filesystem
 * @param filePath Path to the JSON file
 * @returns Parsed JSON data
 */
export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const content = await fs.promises.readFile(filePath, 'utf8')
  return destr<T>(content)
}

/**
 * Read a JSON file from the data directory
 * @param basePath Base directory path (usually process.cwd())
 * @param relativePath Relative path within the data directory
 * @returns Parsed JSON data
 */
export const readDataFile = async <T>(
  basePath: string,
  relativePath: string
): Promise<T> => {
  return readJsonFile<T>(path.join(basePath, 'data', relativePath))
}