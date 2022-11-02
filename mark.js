(() => {
  const gotoForm = () => {
    location.href = "/";
  };
  const qMatch = location.search.match(/[?|&]q=(\S*)($|&)/);
  if (!qMatch) return gotoForm();

  const q = location.search.match(/[?|&]q=(\S*)($|&)/)[1];
  if (!q) return gotoForm();
  const unzipText = LZString.decompressFromEncodedURIComponent(
    location.search.match(/[?|&]q=(\S*)($|&)/)[1]
  );

  const kajoToMarkdown = (text) =>
    text
      .replace(/^([^　|・])(.+)$/gm, "# $1$2")
      .replace(
        /^(　*・)(.+?)$/gm,
        (_, indent, text) => `${indent}${Mikan(text)}`
      )
      .replace(/^(　*)・/gm, (_, s) => `${"  ".repeat(s.length)}- `);

  const transformer = new window.markmap.Transformer();
  const { root, features } = transformer.transform(kajoToMarkdown(unzipText));
  const { styles, scripts } = transformer.getUsedAssets(features);

  if (styles) window.markmap.loadCSS(styles);
  if (scripts)
    window.markmap.loadJS(scripts, {
      getMarkmap: () => window.markmap,
    });

  const mm = window.markmap.Markmap.create(
    "#markmap",
    {
      ...markmap.deriveOptions(),
      maxWidth: 200,
    },
    root
  );

  const toolbar = new window.markmap.Toolbar();
  toolbar.attach(mm);
  const toolbarDom = toolbar.render();
  toolbarDom.setAttribute("style", "position:absolute;bottom:20px;right:20px");
  document.body.append(toolbarDom);

  window.edit = () => {
    location.href = [
      location.origin,
      location.pathname,
      "?q=",
      q
    ].join("");
  };
})();
