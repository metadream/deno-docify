import { Application } from "@focal/cross";
import { HttpContext } from "@focal/cross/context";
import { Cross } from "@focal/cross/decorators";
import { getDocument, getReadme, getSummary, meta } from "./docs.ts";
import { tmpl } from "./tmpl.ts";

@Cross
export default class {

    constructor(app: Application) {
        const { engine } = app;

        app.get("/", async () => {
            const summary = await getSummary();
            const content = await getReadme();
            return engine.render(tmpl, { meta, summary, content });
        });

        app.get("/*", async (ctx: HttpContext) => {
            const summary = await getSummary();
            const content = await getDocument(ctx.request.pathname);
            return engine.render(tmpl, { meta, summary, content });
        });

        app.run();
    }

}