# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a LeetCode problem-solving repository managed with [LeetHub v3](https://github.com/raphaelheinz/LeetHub-3.0). It contains algorithmic solutions primarily in TypeScript and JavaScript, organized by problem number and name.

## Common Commands

### Translation Scripts
- `npm run translate` - Translates all README.md files to Korean using OpenAI API
- `npm run translate:changed` - Translates only README files that changed in the last commit

## Code Architecture

### Directory Structure
- Each LeetCode problem has its own directory named `{problem-number}-{problem-name}/`
- Problem directories contain:
  - Solution files (`.js` or `.ts`)
  - `README.md` (Korean, translated version)
  - `README.en.md` (English original)

### Solution Files
- Solutions are implemented in TypeScript (`.ts`) or JavaScript (`.js`)
- Follow LeetCode function signature conventions
- TypeScript solutions include proper type annotations

### Translation System
The `app/` directory contains an automated translation system:
- `completion.js` - OpenAI API integration
- `translateREADME.js` - Main translation logic that:
  - Finds README.md files without corresponding README.en.md
  - Translates English to Korean using OpenAI
  - Saves original as README.en.md and translated as README.md

### Tracking System
- `stats.json` - Tracks solved problems by difficulty and maintains file hashes
- Automatically updated by LeetHub integration

## Development Patterns

### Problem Solving Approach
- Solutions focus on algorithmic efficiency
- Common patterns: hash tables, two pointers, dynamic programming, stacks
- Both iterative and functional programming styles are used

### File Naming
- Follow LeetCode's URL structure: `{number}-{kebab-case-title}`
- Solution files match directory names

## Language Preferences

**Communication Language**: Always use Korean (한국어) for all todos, responses, and explanations when working with this repository.

When working with this codebase:
- Maintain the existing directory structure for new problems
- Follow TypeScript typing conventions for `.ts` files
- Test solutions against LeetCode examples before committing