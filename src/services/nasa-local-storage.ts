export class NasaLocalStorage {
  private static KEY = 'notes';

  static getNoteByName(name: string) {
    const notes = this.getNotes();

    if (!notes) return null;
    return notes[name];
  }

  static changeNote(note: string | null, name: string) {
    const notes = this.getNotes() || {};

    note ? (notes[name] = note) : delete notes[name];

    if (Object.keys(notes).length < 1) {
      return localStorage.removeItem(this.KEY);
    }

    return localStorage.setItem(this.KEY, JSON.stringify(notes));
  }

  private static getNotes() {
    const rawNotes = localStorage.getItem(this.KEY);

    if (!rawNotes) return null;
    const notes = JSON.parse(rawNotes) as Record<string, string>;

    return notes;
  }
}
