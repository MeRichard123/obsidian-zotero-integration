import { applyDefaultNoteImportFolder } from '../paths';

describe('applyDefaultNoteImportFolder()', () => {
  it('returns output path unchanged when note import folder is empty', () => {
    expect(applyDefaultNoteImportFolder('paper.md', '')).toBe('paper.md');
  });

  it('prepends note import folder for root-level files', () => {
    expect(applyDefaultNoteImportFolder('paper.md', 'Literature')).toBe(
      'Literature/paper.md'
    );
  });

  it('does not prepend note import folder when output path already has a folder', () => {
    expect(applyDefaultNoteImportFolder('Projects/paper.md', 'Literature')).toBe(
      'Projects/paper.md'
    );
  });

  it('normalizes leading slashes and backslashes', () => {
    expect(applyDefaultNoteImportFolder('\\paper.md', '/Literature\\Notes')).toBe(
      'Literature/Notes/paper.md'
    );
  });

  it('keeps nested output paths relative to the vault root', () => {
    expect(applyDefaultNoteImportFolder('/Projects/paper.md', 'Literature')).toBe(
      'Projects/paper.md'
    );
  });
});
