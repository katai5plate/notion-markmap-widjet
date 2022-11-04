document.querySelector("#kajo").placeholder = window.common.placeholder;

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
  const url = `${
    window.common.baseUrl
  }/mark.html?q=${LZString.compressToEncodedURIComponent(
    text
  )}&r=${`${Math.random()}`.slice(-4)}`.replace(/([^:])\/\//g, "$1/");
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
const url = () => {
  const kajo = document.querySelector("#kajo").value;
  try {
    document.querySelector("#url").innerText = generateUrl(kajo);
  } catch (error) {
    alert(error);
  }
};
