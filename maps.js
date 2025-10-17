(async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/CaltropNetwork/pf2/contents/maps"
    );
    const data = await response.json();
    // keep the fetched array so we can filter locally
    const maps = Array.isArray(data) ? data : [];

    function renderList(filter = "") {
      const q = (filter || "").trim().toLowerCase();
      let html = "<ul>";
      for (let file of maps) {
        const name = file.name || "";
        const path = file.path || "";
        if (
          !q ||
          name.toLowerCase().includes(q) ||
          path.toLowerCase().includes(q)
        ) {
          html += `<li><a href="https://caltropnetwork.github.io/pf2/${encodeURI(
            file.path
          )}">${escapeHtml(name)}</a></li>`;
        }
      }
      html += "</ul>";
      document.getElementById("list").innerHTML =
        html || "<p>No maps found.</p>";
    }

    // simple HTML escaper for file names
    function escapeHtml(s) {
      return s.replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[c])
      );
    }

    // initial render
    renderList();

    // wire up the search input
    const input = document.getElementById("search");
    input.addEventListener("input", (e) => renderList(e.target.value));
    // optional: focus the search box on load
    input.focus();
  } catch (err) {
    console.error(err);
    document.getElementById("list").textContent = "Failed to load map list.";
  }
})();
