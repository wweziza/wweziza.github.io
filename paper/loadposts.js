
async function fetchHtmlContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.text();
    } catch (error) {
        console.error('Error fetching content:', error);
        return null;
    }
}

function extractMetadata(fileContent) {
    const titleMatch = fileContent.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = fileContent.match(/<meta name="description" content="(.*?)">/);
    const dateMatch = fileContent.match(/<meta name="date" content="(.*?)">/);
    const readTimeMatch = fileContent.match(/<meta name="readTime" content="(.*?)">/);

    return {
        title: titleMatch ? titleMatch[1].replace(' - Blog', '') : 'Untitled',
        description: descriptionMatch ? descriptionMatch[1] : '',
        date: dateMatch ? dateMatch[1] : 'No date',
        readTime: readTimeMatch ? readTimeMatch[1] : '5 min read'
    };
}

function extractSummary(fileContent) {
    const articleContentMatch = fileContent.match(/<div class="article-content">([\s\S]*?)<\/div>/);
    if (articleContentMatch) {
        const summary = articleContentMatch[1]
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ') 
            .trim()
            .slice(0, 150) + '...';
        return summary;
    }
    return 'No summary available...';
}

function createBlogPostElement(post) {
    return `
        <article class="blog-item">
            <h2 class="blog-title">${post.title}</h2>
            <div class="blog-meta">Published on ${post.date} • ${post.readTime}</div>
            <p class="blog-summary">
                ${post.summary}
            </p>
            <a href="${post.url}" class="read-more">Read More →</a>
        </article>
    `;
}

async function loadBlogPosts() {
    const blogList = document.querySelector('.blog-list');
    blogList.innerHTML = ''; 
    const posts = [
        { filename: 'getting-started-with-web-development.html', path: 'dir/getting-started-with-web-development.html' },
        { filename: 'understanding-the-git.html', path: 'dir/understanding-the-git.html'},
    ];

    const allPosts = [];

    for (const post of posts) {
        const fileContent = await fetchHtmlContent(`${post.path}`);
        if (fileContent) {
            const metadata = extractMetadata(fileContent);
            const summary = extractSummary(fileContent);

            allPosts.push({
                title: metadata.title,
                date: metadata.date,
                readTime: metadata.readTime,
                summary: summary,
                url: post.path
            });
        }
    }

    allPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; 
    });

    allPosts.forEach(post => {
        blogList.innerHTML += createBlogPostElement(post);
    });
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);