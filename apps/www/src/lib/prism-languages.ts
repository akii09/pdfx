/**
 * Import prism-setup first so Prism is on global before these components load.
 * ES module hoisting means we must import setup in a separate file that runs before these.
 */
import './prism-setup';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
