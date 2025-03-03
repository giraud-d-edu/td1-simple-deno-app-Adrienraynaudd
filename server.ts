
import { Application, Router} from "https://deno.land/x/oak/mod.ts";
import { BookController } from "./controllers/book.controller.ts";

const app = new Application();
const router = new Router();

router
  .get("/books", BookController.getAll)
  .get("/books/:id", BookController.getById)
  .post("/books", BookController.create)
  .put("/books/:id", BookController.update)
  .delete("/books/:id", BookController.delete);

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Serveur démarré sur http://localhost:8000");
await app.listen({ port: 8000 });