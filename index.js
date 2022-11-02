(() => {
  const qMatch = location.search.match(/[?|&]q=(\S*)($|&)/);
  if (!qMatch) return;
  const q = location.search.match(/[?|&]q=(\S*)($|&)/)[1];
  if (!q) return;
  const unzipText = LZString.decompressFromEncodedURIComponent(
    location.search.match(/[?|&]q=(\S*)($|&)/)[1]
  );
  document.querySelector("#kajo").value = unzipText;
  document.querySelector("#kajo").placeholder = window.common.placeholder;
})();
const generateUrl = (text) => {
  const url = [
    window.common.baseUrl,
    "/mark.html",
    "?q=",
    // 箇条書き表記のままのほうが文字数が少ない分容量も少ない
    LZString.compressToEncodedURIComponent(text),
  ]
    .join("")
    .replace(/([^:])\/\//g, "$1/");
  if (url.length > 2000) throw new Error("URL長すぎ");
  return url;
};
const submit = () => {
  const kajo = document.querySelector("#kajo").value;
  try {
    location.href = generateUrl(kajo);
  } catch (error) {
    alert(error);
  }
};
