import { Application } from "@focal/cross";
import { HttpContext } from "@focal/cross/context";
import { Cross } from "@focal/cross/decorators";
import { getDocument, getReadme, getSummary, meta } from "./docs.ts";
import { tmpl } from "./tmpl.ts";

@Cross
export default class {

    constructor(app: Application) {

        app.get("/*", async (ctx: HttpContext) => {
            const { pathname } = ctx.request;
            const summary = await getSummary();
            const content = pathname === "/" ? await getReadme() : await getDocument(pathname);

            ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
            return app.engine.render(tmpl, { meta, summary, content });
        });

        app.run();
    }

}