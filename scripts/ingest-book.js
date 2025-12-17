const fs = require('fs');
const path = require('path');
const axios = require('axios');
const matter = require('gray-matter');
const FormData = require('form-data');

const BACKEND_URL = 'http://127.0.0.1:8001/api/v1/ingest';
const DOCS_DIR = path.join(__dirname, '../docs');

async function ingestFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content: cleanText } = matter(content);

        const filename = path.basename(filePath);
        const filenameWithoutExt = path.parse(filename).name;

        if (!cleanText.trim()) {
            console.log(`⚠️  Skipping ${filename} - empty content`);
            return { success: false, filename, reason: 'empty' };
        }

        console.log(`📄 Ingesting: ${filename}...`);

        const chapter = frontmatter.title || filenameWithoutExt;
        
        const formData = new FormData();
        formData.append('file', Buffer.from(cleanText), {
            filename: `${filenameWithoutExt}.txt`,
            contentType: 'text/plain'
        });
        formData.append('title', chapter);
        formData.append('author', 'Physical AI Course');

        const response = await axios.post(BACKEND_URL, formData, {
            headers: formData.getHeaders(),
            timeout: 60000,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        if (response.status === 200) {
            console.log(`✅ Successfully ingested: ${filename} (${chapter})`);
            return { success: true, filename, chapter, book_id: response.data.book_id };
        } else {
            console.log(`❌ Failed to ingest ${filename}: ${response.statusText}`);
            return { success: false, filename, reason: response.statusText };
        }

    } catch (error) {
        console.error(`❌ Error ingesting ${path.basename(filePath)}:`, error.message);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Response:`, error.response.data);
        }
        return { success: false, filename: path.basename(filePath), error: error.message };
    }
}

async function processDirectory(directory) {
    const results = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const subResults = await processDirectory(fullPath);
            results.push(...subResults);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const result = await ingestFile(fullPath);
            if (result) results.push(result);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    return results;
}

async function main() {
    console.log('🚀 Starting book ingestion process...\n');
    console.log(`📂 Docs directory: ${DOCS_DIR}`);
    console.log(`🔗 Backend URL: ${BACKEND_URL}\n`);

    try {
        const results = await processDirectory(DOCS_DIR);
        
        console.log('\n📊 Ingestion Summary:');
        console.log('═══════════════════════════════════════');
        
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        
        console.log(`✅ Successful: ${successful.length}`);
        console.log(`❌ Failed: ${failed.length}`);
        
        if (failed.length > 0) {
            console.log('\nFailed files:');
            failed.forEach(f => {
                console.log(`   - ${f.filename}: ${f.reason || f.error || 'Unknown error'}`);
            });
        }
        
        console.log('\n🎉 Ingestion process complete!');
        
    } catch (error) {
        console.error('💥 Fatal error during ingestion:', error.message);
        process.exit(1);
    }
}

main();