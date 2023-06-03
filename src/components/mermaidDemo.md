---
# Note: client-side mermaid support is provided by this layout!! Ensure that
# any layouts that may render mermaid include the mermaid init script to load
# the client-side JS
layout: "../layouts/genericMarkdownFile.astro"
---

# Mermaid Demo

This can be removed once we have some mermaid examples in the codebase, but for
now, here's how we can use mermaid!

```mermaid
flowchart LR
A{cool} --> C(Chart)
```

- mermaid is validated at build-time
  - `npm run build` will fail if we have _any_ invalid mermaid
  - in dev mode, invalid mermaid will be replaced with a friendly warning text
- note: mermaid rendering actually happens on the client; there is a mermaid
  init script which conditionally will dynamically import the mermaid.js
  library based on whether any mermaid elements are in the page after
  `DOMContentLoaded`.

## More Diagrams

```mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
```

```mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
```
