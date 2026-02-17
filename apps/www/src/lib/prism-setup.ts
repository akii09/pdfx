/**
 * Prism must be on the global before prismjs language components load.
 * Import this file first so the assignment runs before any prismjs component imports.
 */
import { Prism } from 'prism-react-renderer';

(globalThis as unknown as { Prism: typeof Prism }).Prism = Prism;
