# Voice Spec

`voice.md` is the single output file for a collaborator's responses. It lives
in the identity folder at `.{name}/voice.md` and is overwritten on each new
response. The title is `# {Collaborator}'s Voice`.

## Structure

The file uses `<details>` blocks so that sections can be collapsed in VS Code's
markdown preview. The document is organized top-to-bottom:

```markdown
# {Name}'s Voice

<!-- {timestamp} -->

<details>
<summary>Thoughts</summary>

{thinking, reasoning, analysis — whatever the collaborator worked through
before arriving at their response}

</details>

{main response text — this is what you read}

<details>
<summary>{artifact title or filename}</summary>

\`\`\`{lang}
{code or content}
\`\`\`

</details>

<details>
<summary>{another artifact}</summary>

\`\`\`{lang}
{code or content}
\`\`\`

</details>
```

## Sections

### Thoughts

The collaborator's reasoning process. Always at the top, always collapsed.
When the preview opens, this section is hidden — you see the main text first.
Expand it if you want to understand how they arrived at their answer.

In Claude Desktop, thinking may appear as:
- A collapsed summary line (e.g., "Prioritized database schema creation...")
- An explicit thinking block
- Analysis text before the main response

### Main text

The collaborator's actual response. Not wrapped in `<details>` — it is
always visible. This is the voice.

### Code blocks in the body

Short code blocks that illustrate a point — a snippet, an example, a shell
command — stay visible in the main text. They are part of the voice, not
separate documents. They are **not** wrapped in `<details>`.

### Editable artifacts

Full documents, schemas, configs, or files the collaborator produced as
standalone outputs. These correspond to what Claude Desktop shows in the
artifact panel. Each gets its own collapsed `<details>` block with a
descriptive summary (filename or purpose). Expand to see the content.

A code block is treated as an editable artifact if:
- It is 6+ lines long, OR
- The preceding text line looks like a filename (e.g., `schema.sql`)

## Example

A collaborator named Seraphima responds to a question about database schema.
Her response included thinking, a text answer, and a SQL artifact:

```markdown
# Seraphima's Voice

<!-- 2026-03-15 19:30 -->

<details>
<summary>Thoughts</summary>

Considered whether to use a single table with JSON columns or three normalized
tables. The normalized approach is better for querying individual entries and
avoids the need to parse JSON on read. Decided on three tables: literal,
metaphor, and annotation. Literal holds the raw text, metaphor holds the
interpretive layer, annotation links the two with context.

</details>

Yes, three tables is the right call. Here's why:

The literal table holds source material — quotes, observations, data points.
The metaphor table holds interpretations — what a thing *means*, not what it
*is*. And the annotation table is the bridge, linking a specific literal to a
specific metaphor with context about why.

This keeps each layer queryable on its own. You can ask "show me all metaphors"
without parsing through literals, or "what literals support this metaphor"
through the annotation join:

\`\`\`sql
SELECT m.content FROM metaphor m
JOIN annotation a ON a.metaphor_id = m.id
WHERE a.literal_id = 42;
\`\`\`

I've drafted the full schema below. The foreign keys enforce referential
integrity so you can't have orphaned annotations.

<details>
<summary>schema.sql</summary>

\`\`\`sql
CREATE TABLE literal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metaphor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    domain TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE annotation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    literal_id INTEGER NOT NULL REFERENCES literal(id),
    metaphor_id INTEGER NOT NULL REFERENCES metaphor(id),
    context TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

</details>
```

When this renders in VS Code's markdown preview:
- "Thoughts" appears as a clickable collapsed bar — click to expand
- The main text about the three tables is immediately visible
- The short SQL query is visible inline — it's part of the explanation
- "schema.sql" appears as a clickable collapsed bar — click to see the full schema

## Rules

- `voice.md` is overwritten on every new response. It is not a log.
- The title (`# {Name}'s Voice`) uses the collaborator's name from `.env`.
- The timestamp in the HTML comment is for reference, not display.
- Thoughts are always collapsed. Artifacts are always collapsed. Main text
  is always visible.
- If there are no thoughts, omit the thoughts section entirely.
- If there are no artifacts, omit the artifacts section entirely.
- The file should render cleanly in VS Code's markdown preview with
  `<details>` blocks collapsible.
