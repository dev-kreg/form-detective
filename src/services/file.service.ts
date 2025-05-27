import { Injectable, OnInit } from '@angular/core';
import { DirectoryEntry } from '../models/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private filesystem: DirectoryEntry = {
    name: 'root',
    children: []
  };

  private readonly STORAGE_KEY = 'kregOS_filesystem';

  constructor() {
    this.loadState();
  }

  private saveState(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.filesystem));
  }

  private loadState(): void {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    if (savedState) {
      this.filesystem = JSON.parse(savedState);
    }
  }

  create(path: string[], name: string, type: 'file' | 'directory'): void {
    const parent = this.traverse(path); // Find the parent directory

    if (!parent || !parent.children) {
      throw new Error('Invalid path: Cannot create item at the specified location.');
    }

    const newEntry: DirectoryEntry = { name, modifiedAt: new Date() };

    if (type === 'file') {
      newEntry.content = '';
    } else if (type === 'directory') {
      newEntry.children = [];
    }

    // Add the new entry to the parent's children
    parent.children.push(newEntry);

    this.saveState(); // Save the updated filesystem state
  }

  read(path: string[]): any {
    if (path.length === 0) {
      return this.filesystem; // Return the root filesystem if no path is provided
    }

    const entry = this.traverse(path); // Use the traverse method to find the entry

    if (entry) {
      return entry; // Return the found entry
    } else {
      return null; // Return null if the path is invalid
    }
  }

  update(path: string[], newContent: any): void {
    const entry = this.traverse(path); // Find the entry to update

    if (!entry) {
      throw new Error('Invalid path: Cannot update item at the specified location.');
    }

    if (!('content' in entry)) {
      throw new Error('Invalid operation: Only files can be updated.');
    }

    entry.content = newContent; // Update the file's content
    entry.modifiedAt = new Date(); // Update the modification timestamp

    this.saveState(); // Save the updated filesystem state
  }

  delete(path: string[]): void {
    // ...traverse filesystem and remove file/directory...
    this.saveState();
  }

  private traverse(path: string[]): DirectoryEntry | null {
    let current: DirectoryEntry | undefined = this.filesystem;

    for (const segment of path) {
      if (!current.children) {
        return null; // Path is invalid, no children to traverse
      }
      if (current.name === segment) {
        return current; // Return the current entry if it matches the segment
      }
      current = current.children.find(child => child.name === segment);

      if (!current) {
        return null; // Path segment not found
      }
    }

    return current || null; // Return the found entry or null if not found
  }
}
