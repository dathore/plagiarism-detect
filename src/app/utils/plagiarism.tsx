// utils/plagiarism.js

import { franc } from 'franc';
import nlp from 'compromise';

// Custom tokenizer for Thai language
function thaiTokenizer(text) {
    return text.split('').filter(token => token.trim().length > 0);
}

// Custom tokenizer for Lao language
function laoTokenizer(text) {
    return text.split('').filter(token => token.trim().length > 0);
}

// Tokenization function that handles multiple languages
function tokenize(text, lang) {
    let tokens = [];
    if (lang === 'eng') {
        const doc = nlp(text);
        tokens = doc.terms().out('array');
    } else if (lang === 'tha') {
        tokens = thaiTokenizer(text);
    } else if (lang === 'lao') {
        tokens = laoTokenizer(text);
    } else {
        tokens = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 0);
    }
    return tokens;
}

// Create shingles (n-grams)
function createShingles(tokens, n) {
    let shingles = [];
    for (let i = 0; i <= tokens.length - n; i++) {
        shingles.push(tokens.slice(i, i + n).join(' '));
    }
    return shingles;
}

// Calculate Jaccard similarity
function jaccardSimilarity(set1, set2) {
    if (set1.length === 0 || set2.length === 0) return 0;
    let intersection = set1.filter(value => set2.includes(value)).length;
    let union = new Set([...set1, ...set2]).size;
    return intersection / union;
}

// Main plagiarism detection function
export function detectPlagiarism(text1, text2, n = 3) {
    const lang1 = franc(text1);
    const lang2 = franc(text2);

    let tokens1 = tokenize(text1, lang1);
    let tokens2 = tokenize(text2, lang2);

    let shingles1 = createShingles(tokens1, n);
    let shingles2 = createShingles(tokens2, n);

    let similarity = jaccardSimilarity(shingles1, shingles2);
    return { similarity, lang1, lang2 };
}
