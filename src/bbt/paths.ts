import path from 'path';

function stripLeadingSlashes(value: string) {
  return value.replace(/^[/\\]+/, '');
}

function normalizeVaultPath(value: string) {
  return stripLeadingSlashes(value.trim().replace(/\\/g, '/'));
}

// Use Note Import Location as a fallback only when template output is a root-level file.
export function applyDefaultNoteImportFolder(
  outputPath: string,
  noteImportFolder?: string
) {
  const normalizedOutputPath = normalizeVaultPath(outputPath);

  if (!normalizedOutputPath) {
    return normalizedOutputPath;
  }

  const normalizedImportFolder = normalizeVaultPath(noteImportFolder || '');

  if (!normalizedImportFolder) {
    return normalizedOutputPath;
  }

  const outputDir = path.posix.dirname(normalizedOutputPath);

  if (outputDir && outputDir !== '.') {
    return normalizedOutputPath;
  }

  return path.posix.join(normalizedImportFolder, normalizedOutputPath);
}
