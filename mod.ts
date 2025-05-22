import { Application } from "@focal/cross";
import { HttpContext } from "@focal/cross/context";
import { Cross } from "@focal/cross/decorators";
import { meta, getDocument, getSummary, getReadme } from "./docs.ts";

@Cross
export default class {

    constructor(app: Application) {
        app.get("/", async () => {
            const summary = await getSummary();
            const content = await getReadme();
            return app.view("tmpl.html", { meta, summary, content });
        });

        app.get("/*", async (ctx: HttpContext) => {
            const summary = await getSummary();
            const content = await getDocument(ctx.request.pathname);
            return app.view("tmpl.html", { meta, summary, content });
        });
    }

}