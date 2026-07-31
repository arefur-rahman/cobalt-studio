// Define TypeScript structures for articles
export interface Article {
    slug: string;
    title: string;
    category: string;
    publishDate: string;
    readTime: number; // in minutes
    excerpt: string;
    content: string; // Markdown format
}

// Highly detailed programming and web development dummy articles
export const DUMMY_ARTICLES: Article[] = [
    {
        slug: "react-19-server-actions-guide",
        title: "React 19 Server Actions: The Definitive Guide",
        category: "React",
        publishDate: "2026-07-10T10:00:00Z",
        readTime: 6,
        excerpt:
            "Understand how React 19 Server Actions bridge the gap between client interaction and backend database operations with zero boilerplate.",
        content: `# React 19 Server Actions: The Definitive Guide

React 19 introduces a native way to handle data mutations and form submissions directly from components using **Server Actions**. Rather than creating API routes, parsing JSON, and managing loading or error state manually, you can define asynchronous functions that execute on the server.

### Basic Implementation

Here is how you can define a simple Server Action inside a client component:

\`\`\`javascript
// actions.js
'use server';

export async function subscribeNewsletter(formData) {
  const email = formData.get('email');
  if (!email) return { error: 'Email is required' };
  
  // Save to database
  await db.newsletter.create({ data: { email } });
  
  return { success: true };
}
\`\`\`

\`\`\`tsx
// NewsletterForm.tsx
'use client';

import { subscribeNewsletter } from './actions';
import { useTransition } from 'react';

export default function NewsletterForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    startTransition(async () => {
      const result = await subscribeNewsletter(formData);
      if (result.success) {
        alert('Thank you for subscribing!');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <input 
        type="email" 
        name="email" 
        placeholder="Enter your email"
        className="border border-border p-2 rounded bg-background" 
      />
      <button 
        type="submit" 
        disabled={isPending} 
        className="bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity"
      >
        {isPending ? 'Submitting...' : 'Subscribe'}
      </button>
    </form>
  );
}
\`\`\`

### Key Benefits

1. **Zero Boilerplate**: No need to write \`/pages/api/subscribe.ts\` files or fetch them using \`fetch('/api/subscribe')\`.
2. **Progressive Enhancement**: Server Actions can run even before JavaScript loads, offering robust form submissions out-of-the-box.
3. **Optimistic Updates**: Using hooks like \`useOptimistic\`, you can display updated state instantly while the server completes the request.

> **Note on Security**: Ensure that you do not leak sensitive backend keys or imports when writing Server Actions. Keep your server logic clean and segregated from client-side imports. Use the \`server-only\` package to guard code execution context.
`,
    },
    {
        slug: "mastering-css-container-queries",
        title: "Mastering CSS Container Queries and :has()",
        category: "CSS",
        publishDate: "2026-07-08T14:30:00Z",
        readTime: 5,
        excerpt:
            "Learn how to build truly responsive component layouts that adapt to their container sizes and style based on child elements.",
        content: `# Mastering CSS Container Queries and :has()

Responsive design is no longer just about viewport dimensions. Modern applications are component-driven, meaning components need to render differently depending on *where* they are placed on a page. **CSS Container Queries** make this a native reality.

### Defining a Container

To use container queries, you must first register a parent element as a container:

\`\`\`css
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}
\`\`\`

Once registered, you can query this container using \`@container\`:

\`\`\`css
.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

@container card-container (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: 1.5rem;
    padding: 2rem;
  }
}
\`\`\`

### The Relational Pseudo-class: \`:has()\`

The \`:has()\` selector (often called the \"parent selector\") unlocks dynamic CSS logic based on child presence. For instance, styling a card parent if it contains an active primary button:

\`\`\`css
.card:has(button.btn-primary) {
  border: 2px solid var(--primary-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
\`\`\`

We can even query elements followed by other elements:

\`\`\`css
/* Style an h2 only when followed by a paragraph */
h2:has(+ p) {
  margin-bottom: 0.5rem;
}
\`\`\`

### Layout Combinators

Combining \`@container\` queries and \`:has()\` allows components to adapt to high-density dashboards, narrow sidebars, or wide hero sections seamlessly without relying on bulky JS sizing scripts:

- Use container queries to adjust padding, font sizing, and flex directions.
- Use \`:has()\` to toggle specific themes or configurations based on state flags inside subcomponents.
`,
    },
    {
        slug: "optimizing-interaction-to-next-paint",
        title: "Optimizing Interaction to Next Paint (INP) for Web Apps",
        category: "Performance",
        publishDate: "2026-07-05T09:15:00Z",
        readTime: 8,
        excerpt:
            "INP is now a Core Web Vital. Discover practical steps to optimize JavaScript execution, reduce long tasks, and maintain responsiveness.",
        content: `# Optimizing Interaction to Next Paint (INP)

**Interaction to Next Paint (INP)** has officially replaced First Input Delay (FID) as a Google Core Web Vital. It measures user interface responsiveness by tracking the latency of all click, tap, and keyboard interactions throughout a page's lifecycle.

### What is a Good INP?

- **Good**: <= 200 milliseconds.
- **Needs Improvement**: Between 200 and 500 milliseconds.
- **Poor**: > 500 milliseconds.

### Common INP Bottlenecks

INP is usually high due to:
1. **Long Tasks**: JavaScript tasks that block the main thread for more than 50 milliseconds.
2. **Large DOM Sizes**: Changing a state triggers a re-render of thousands of nodes, stalling the paint process.
3. **Over-execution of Event Handlers**: Performing heavy calculations synchronous with click events.

### How to Yield to the Main Thread

To optimize INP, break up heavy JavaScript tasks. You can use standard yielding patterns or the modern \`scheduler.yield()\` API:

\`\`\`javascript
function yieldToMain() {
  if (globalThis.scheduler && globalThis.scheduler.yield) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function handleBigInteraction() {
  // Task part 1: Pre-process some records
  processChunks(0, 100);
  
  // Yield back control so browser can paint
  await yieldToMain();
  
  // Task part 2: Continue work
  processChunks(100, 200);
}
\`\`\`

### CSS Tricks to Speed up Painting

Use \`content-visibility: auto\` on offscreen sections. This instructs the browser to skip layout and rendering work for elements outside the viewport, accelerating response times and improving overall interaction metrics.
`,
    },
    {
        slug: "advanced-typescript-type-gymnastics",
        title: "Advanced TypeScript: Infer, Template Literals, and Mapped Types",
        category: "TypeScript",
        publishDate: "2026-07-01T11:00:00Z",
        readTime: 7,
        excerpt:
            "Level up your type safety with advanced TypeScript techniques. We cover template literal types, mapped types with key remapping, and conditional inferring.",
        content: `# Advanced TypeScript: Type Gymnastics

TypeScript is more than just static interfaces. Its type system is Turing-complete, enabling developers to build sophisticated type safety layers that prevent runtime errors.

### Conditional Types and \`infer\`

The \`infer\` keyword allows you to declare a type variable within a conditional type check:

\`\`\`typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greeting() {
  return "Hello, Antigravity!";
}

// Result resolves to: string
type GreetingReturn = GetReturnType<typeof greeting>;
\`\`\`

### Template Literal Types

Template literal types allow you to manipulate string values inside types, similar to Javascript template literals:

\`\`\`typescript
type Direction = "top" | "right" | "bottom" | "left";
type PaddingClass = \`p-\${Direction}\`;

// PaddingClass expands to: "p-top" | "p-right" | "p-bottom" | "p-left"
const classes: PaddingClass = "p-right";
\`\`\`

### Mapped Types with Key Remapping

Using mapped types, you can transform properties of an existing type into a new format:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  age: number;
}

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// UserGetters has methods: getId(), getName(), getAge()
type UserGetters = Getters<User>;
\`\`\`

By leveraging these advanced utilities, you can write highly dynamic libraries that remain completely type-safe.
`,
    },
    {
        slug: "anatomy-of-clean-code-javascript",
        title: "The Anatomy of Clean Code in Modern JavaScript",
        category: "Software Design",
        publishDate: "2026-06-25T16:00:00Z",
        readTime: 4,
        excerpt:
            "Writing readable, maintainable, and testable JavaScript code. Explore function composition, error handling patterns, and clean designs.",
        content: `# The Anatomy of Clean Code in JavaScript

Clean code is not about formatting style; it is about reducing the cognitive load required to read, understand, and safely modify a codebase. Let's explore three core practices for writing clean JavaScript code.

### 1. Guard Clauses Over Nested \`if\`s

Deep nesting makes code extremely difficult to trace. Instead, validate conditions early and exit the function as soon as possible.

\`\`\`javascript
// Bad practice
function registerUser(user) {
  if (user !== null) {
    if (user.email) {
      if (isValidEmail(user.email)) {
        saveUser(user);
      } else {
        throw new Error("Invalid email");
      }
    } else {
      throw new Error("Email is required");
    }
  } else {
    throw new Error("User cannot be null");
  }
}

// Good practice: Clean Guard Clauses
function registerUser(user) {
  if (!user) throw new Error("User cannot be null");
  if (!user.email) throw new Error("Email is required");
  if (!isValidEmail(user.email)) throw new Error("Invalid email");

  saveUser(user);
}
\`\`\`

### 2. Pure Functions & Side Effects

Keep your logic predictable. A function should ideally rely solely on its input arguments and return a value without modifying external variables.

\`\`\`javascript
// Impure (Modifies external array)
const items = [1, 2, 3];
function addItem(item) {
  items.push(item);
}

// Pure (Returns a new array)
function addItemPure(currentItems, newItem) {
  return [...currentItems, newItem];
}
\`\`\`

### 3. Meaningful Names over Comments

Write code that explains itself. If you need a block comment to explain *what* the code does, consider renaming your variables or breaking the block into helper functions.
`,
    },
];

// Extract distinct categories dynamically
export const CATEGORIES = [
    "All",
    ...Array.from(new Set(DUMMY_ARTICLES.map((a) => a.category))),
];

// DB-Readiness Helpers (Pre-structured for future Prisma MongoDB integration)
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    // In future, replace with: return await prisma.article.findUnique({ where: { slug } });
    const article = DUMMY_ARTICLES.find((a) => a.slug === slug);
    return article || null;
}

export async function getAllArticles(): Promise<Article[]> {
    // In future, replace with: return await prisma.article.findMany();
    return DUMMY_ARTICLES;
}

export async function getAdjacentArticles(
    slug: string,
): Promise<{ prev: Article | null; next: Article | null }> {
    // In future, replace with DB query fetching previous and next sorted by date
    const index = DUMMY_ARTICLES.findIndex((a) => a.slug === slug);
    if (index === -1) return { prev: null, next: null };

    // Sort logic aligns with how articles are ordered
    const prev = index > 0 ? DUMMY_ARTICLES[index - 1] : null;
    const next =
        index < DUMMY_ARTICLES.length - 1 ? DUMMY_ARTICLES[index + 1] : null;

    return { prev, next };
}

export async function getAllArticleSlugs(): Promise<string[]> {
    // In future, replace with: const articles = await prisma.article.findMany({ select: { slug: true } }); return articles.map(a => a.slug);
    return DUMMY_ARTICLES.map((a) => a.slug);
}
