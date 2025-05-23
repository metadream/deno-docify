import { Application } from "@focal/cross";
import { HttpContext } from "@focal/cross/context";
import { Cross } from "@focal/cross/decorators";
import { getDocument, getReadme, getSummary, meta } from "./docs.ts";

@Cross
export default class {

    constructor(app: Application) {
        const { engine } = app;
        const tmpl = new URL('./test.tmpl', import.meta.url).pathname;

        app.get("/", async () => {
            const summary = await getSummary();
            const content = await getReadme();
            return engine.view(tmpl, { meta, summary, content });
        });

        app.get("/*", async (ctx: HttpContext) => {
            const summary = await getSummary();
            const content = await getDocument(ctx.request.pathname);
            return engine.view(tmpl, { meta, summary, content });
        });

        app.run();
    }

}