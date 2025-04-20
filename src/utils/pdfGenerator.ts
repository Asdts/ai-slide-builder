/**
 * created by ASDTS
 * all right reserved
 * https://github.com/ASDTS
 */

import fs from "fs/promises";
import path from "path";
import os from "os";
import { spawn } from "child_process";
import { PDFDocument } from "pdf-lib";

/**
 * 
 * @param prefix - The prefix for the temporary directory name (default is "mar
 * @returns 
 */
export async function createTempDir(prefix = "marp-slide-"): Promise<string> {
  const tempPath = await fs.mkdtemp(path.join(os.tmpdir(), prefix));
  return tempPath;
}
/**
 * Writes the markdown content to a file in the specified directory.
 * @param dir - The directory where the file will be written.
 * @param content - The markdown content to write.
 * @param filename - The name of the file (default is "slides.md").
 * @returns The path to the created markdown file.
*/
export async function writeMarkdownToFile(dir: string, content: string, filename = "slides.md"): Promise<string> {
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, content, "utf-8");
  return filePath;
}


/**
 * 
 * @param mdFilePath 
 * @param outputPDFPath 
 * @returns 
 */
export async function generatePDFWithMarp(mdFilePath: string, outputPDFPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const marp = spawn("npx", ["marp", mdFilePath, "--pdf", "-o", outputPDFPath]);

    marp.stdout.on("data", (data) => {
      console.log(`[marp]: ${data}`);
    });

    marp.stderr.on("data", (data) => {
      console.error(`[marp-error]: ${data}`);
    });

    marp.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Marp CLI exited with code ${code}`));
    });
  });
}

/**
 * Merges multiple PDF files into a single PDF file.
 * @param inputPaths - Array of paths to the input PDF files.
 * @param outputPath - Path to the output merged PDF file.
 */
export async function mergePDFs(inputPaths: string[], outputPath: string): Promise<void> {
  const mergedPdf = await PDFDocument.create();

  for (const pdfPath of inputPaths) {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  await fs.writeFile(outputPath, mergedBytes);
}

/**
 * Cleans up the specified directory by removing it and all its contents.
 * @param dirPath - The path to the directory to be cleaned up.
 */
export async function cleanupDirectory(dirPath: string): Promise<void> {
  await fs.rm(dirPath, { recursive: true, force: true });
}
