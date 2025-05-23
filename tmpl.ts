import { dirname } from "@std/path/dirname";

const __dirname = dirname(import.meta.url.replace(/^file:\/\//, ""));
const tmplFile = __dirname + "/tmpl.html";

export const tmpl = await (async function () {
    if (tmplFile.match(/^https?:\/\//)) {
        const response = await fetch(tmplFile);
        return await response.text();
    }
    return await Deno.readTextFile(tmplFile);
})();