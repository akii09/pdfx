import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RegistryFile {
  path: string;
  type: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies?: string[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

async function buildRegistry() {
  console.log('🏗️  Building registry...\n');

  // Read registry index
  const registryPath = path.join(__dirname, '../registry/index.json');
  const registry: Registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

  // Create output directory
  const outputDir = path.join(__dirname, '../../public/r');
  fs.mkdirSync(outputDir, { recursive: true });

  // Process each item
  for (const item of registry.items) {
    console.log(`Processing ${item.name}...`);

    const output = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      files: [] as Array<{ path: string; content: string; type: string }>,
      dependencies: item.dependencies || [],
    };

    // Read and process files
    for (const file of item.files) {
      const filePath = path.join(path.dirname(registryPath), file.path);
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);

      output.files.push({
        path: `components/pdfx/pdfx-${fileName}`,
        content,
        type: file.type,
      });
    }

    // Write output file
    const outputPath = path.join(outputDir, `${item.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`✅ ${item.name}.json`);
  }

  // Write registry index
  const indexOutputPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexOutputPath, JSON.stringify(registry, null, 2));
  console.log('✅ index.json');

  console.log('\n✨ Registry built successfully!');
  console.log(`📁 Output: ${outputDir}\n`);
}

buildRegistry().catch(console.error);
