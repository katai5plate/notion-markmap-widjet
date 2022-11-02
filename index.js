(() => {
  const qMatch = location.search.match(/[?|&]q=(\S*)($|&)/);
  if (!qMatch) return;
  const q = location.search.match(/[?|&]q=(\S*)($|&)/)[1];
  if (!q) return;
  const unzipText = LZString.decompressFromEncodedURIComponent(
    location.search.match(/[?|&]q=(\S*)($|&)/)[1]
  );
  document.querySelector("#kajo").value = unzipText;
})();
const generateUrl = (text) => {
  const url = [
    location.origin,
    location.pathname,
    "/mark.html",
    "?q=",
    // 箇条書き表記のままのほうが文字数が少ない分容量も少ない
    LZString.compressToEncodedURIComponent(text),
  ].join("");
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
