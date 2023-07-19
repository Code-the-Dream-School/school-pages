import mermaid from "mermaid";

/**
 * Custom mermaid transformer plugin for this site. Transforms;
 *
 *     ```mermaid
 *     flowchart LR
 *     A --> B
 *     ```
 *
 * Into
 *
 *     <div class="mermaid">
 *     flowchart LR
 *     A --> B
 *     </div>
 *
 * Then, [mermaid.js](https://mermaid.js.org/) does the rest client-side.
 */
export const ctdMermaidPlugin = () => asyncAdapter;

type Position = {
  line: number;
  column: number;
  offset: number;
};

// Astro exports data types but they appear to be wrong / crappy so I'll
// just define my own
type Node = {
  type: string;
  /**
   * Present for nodes of type "code"
   */
  lang?: string;
  value?: string;
  children?: Node[];
  position: {
    start: Position;
    end: Position;
  };
};

// Note: the second arg provides a view of the whole file, unparsed, which we
// don't really care about here.
function asyncAdapter(rootNode: Node, _: unknown, next: (err?: Error) => void) {
  mermaidTransformer(rootNode)
    .then(() => next())
    .catch(next);
}

async function mermaidTransformer(node: Node): Promise<void> {
  if (node.type === "code" && node.lang === "mermaid") {
    await handleMermaidNode(node);
  } else if ("children" in node) {
    await Promise.all(node.children.map(mermaidTransformer));
  }
}

/**
 * Convert the incoming mermaid node to the new node that will replace it
 * through mutation.
 *
 * Also, parse the inner mermaid source code with the mermaid library, and
 * provide a friendly error if that fails.
 */
async function handleMermaidNode(node: Node): Promise<void> {
  const { isValid } = await validateMermaid(node.value || "");

  // I realize that this basically makes `node.position` incorrect...
  // Hopefully that won't have dir consequences, because I really don't
  // want to need to walk through the whole AST and fix it.
  //
  // The good news is I do see a very similar pattern being recommended
  // here: https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/#find-and-modify-markdown-nodes
  node.value = isValid
    ? `<div class="mermaid">${node.value}</div>`
    : devModeFriendlyWarning;
  node.type = "html";
  delete node.lang;
}

async function validateMermaid(
  mermaidSrc: string
): Promise<{ isValid: boolean }> {
  try {
    // Getting this little guy to work in the Node.JS environment in which
    // Astro does its build is the reason for the patch-package nightmare
    // being introduced. I found by just making `mermaid` use
    // `isomorphic-dompurify` (which is safe to run in Node.JS and has a
    // compatible API) instead of `dompurify`, this function would work.
    // Through patch-package, I can accomplish this :)
    //
    // If this ever goes wrong, and I would not be totally shocked if it does,
    // we can just throw away this nice-to-have. The only feature this
    // implements is the ability to syntax-validate mermaid diagrams at
    // build time, providing a nicer development experience but, more
    // importantly, making it impossible to ship invalid mermaid content,
    // since it will break CI.
    //
    // Of course, taking a step back, we'd ideally want to compile our
    // mermaid source into static content at build time, but the mermaid
    // library is so heavily dependent on the DOM I don't see anything out
    // there to accomplish this that doesn't user puppeteer / browser
    // automation, which is just deeply cursed (hello mermaid-cli...).
    //
    // Only note that if we are ever in a position where we need/want to remove
    // this, we should probably register an error-handler with Mermaid
    // client-side, because the default mermaid, "syntax error," UI is very
    // ugly, and is currently being effectively hidden!!
    await mermaid.parse(mermaidSrc);
  } catch (e) {
    if (e instanceof Error) {
      e.message +=
        "\nCTD Tip: this is probably because your Mermaid chart syntax is invalid. " +
        "\nConsider copying and pasting it into the mermaid live editor at https://mermaid.live/edit!\n\n" +
        `Invalid mermaid was:\n\n${mermaidSrc}`;
      if (process.env.NODE_ENV === "development") {
        // In development, it's not very nice to have such a flow-breaking
        // disruption as having the whole build process explode just because
        // your diagram syntax is bad. Instead of erroring out in this case,
        // we'll send a return value to the caller, which you can see we use
        // to swap out the mermaid for our `devModeFriendlyWarning`.
        console.error(e.stack);
        return { isValid: false };
      } else {
        // In prod, though, we'll throw if the thing failed to parse. This
        // will break CI/CD pipelines if we have invalid mermaid, which is
        // what we want.
        throw e;
      }
    } else {
      // Gotta love JS -- a world of endless possibilities :)
      throw e;
    }
  }
  return { isValid: true };
}

const devModeFriendlyWarning = `
<h2 class="rounded border border-red-500 p-2">
  <span class="text-red-500">Error:</span>
  mermaid syntax is invalid. See console for details!
  <p class="italic font-light text-xs">
    Note: this message only appears during development. The production build
    will fail if this issue is present.
  </p>
</h2>
`;
