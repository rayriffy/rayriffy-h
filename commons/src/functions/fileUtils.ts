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

/**
 * Write data to a JSON file
 * @param filePath Path to the JSON file
 * @param data Data to write
 * @param pretty Whether to pretty-print the JSON (defaults to false)
 */
export const writeJsonFile = async <T>(
  filePath: string,
  data: T,
  pretty: boolean = false
): Promise<void> => {
  const content = pretty
    ? JSON.stringify(data, null, 2)
    : JSON.stringify(data)
  
  // Ensure directory exists
  const dir = path.dirname(filePath)
  await fs.promises.mkdir(dir, { recursive: true })
  
  // Write the file
  await fs.promises.writeFile(filePath, content, 'utf8')
}

/**
 * Write data to a JSON file in the data directory
 * @param basePath Base directory path (usually process.cwd())
 * @param relativePath Relative path within the data directory
 * @param data Data to write
 * @param pretty Whether to pretty-print the JSON (defaults to false)
 */
export const writeDataFile = async <T>(
  basePath: string,
  relativePath: string,
  data: T,
  pretty: boolean = false
): Promise<void> => {
  await writeJsonFile(
    path.join(basePath, 'data', relativePath),
    data,
    pretty
  )
}

/**
 * Check if a file exists
 * @param filePath Path to the file
 * @returns Whether the file exists
 */
export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Create a directory if it doesn't exist
 * @param dirPath Path to the directory
 */
export const ensureDir = async (dirPath: string): Promise<void> => {
  await fs.promises.mkdir(dirPath, { recursive: true })
}