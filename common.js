window.common = {
  baseUrl: /localhost/.test(location.origin)
    ? "/"
    : "https://katai5plate.github.io/notion-mindmap-widjet/",
  placeholder: `題名
・１
　・１－１
　・１－２
・２
　・２－１
　　・２－１－１
　・２－２
　・２－３
　　・２－３－１
・３`.replace(/\n/g, "&#13;&#10;"),
};
