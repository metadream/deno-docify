import { Application } from "jsr:@focal/cross";
import { Cross } from "jsr:@focal/cross/decorators";
import { tmpl } from "./tmpl.ts";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";
import { HttpContext } from "jsr:@focal/cross/context";

@Cross
export default class {

    constructor(app: Application) {
        app.get("/", async (ctx: HttpContext) => {
            const summary = await getSummary();
            const content = await getReadme();
            return ctx.render(tmpl, { meta, summary, content });
        });

        app.get("/*", async (ctx: HttpContext) => {
            const summary = await getSummary();
            const content = await getDocument(ctx.request.pathname);
            return ctx.render(tmpl, { meta, summary, content });
        });
    }

}