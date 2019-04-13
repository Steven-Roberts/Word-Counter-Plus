const title = chrome.runtime.getManifest().name;

chrome.contextMenus.create({
    id: title,
    title,
    contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info) => {
    const text = info.selectionText;

    const words = text.split(/\s+/);
    const wordCount = words.length;
    const charCount = text.length;

    let totalLength = 0;
    let maxLength = 0;
    let longestWord = "";
    for (let i = 0; i < wordCount; i++) {
    	const curWord = words[i].replace(/[.,?!()<>{}[\]/\\+=~'`|:;]/g, '');
        const curLength = curWord.length;
        totalLength += curLength;
        if (curLength > maxLength) {
            maxLength = curLength;
            longestWord = curWord;
        }
    }
    const avgLength = wordCount === 0
        ? 0
        : totalLength / wordCount;

    const numAverageDigits = 2;

    alert(`Word Count: ${wordCount}
Character Count: ${charCount}
Average Word Length: ${avgLength.toFixed(numAverageDigits)}
Longest Word Length: ${maxLength} ("${longestWord}")`);
});
