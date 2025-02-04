import express from 'express';
import Router from './routes/Router';


class Main {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    const r = new Router();
    this.app.use(r.router);
    this.app.get('/', (req, res) => { res.send('Hello World!'); });
    this.main();
  }

  private start_server(): void {
    const PORT = 3000;
    this.app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  }

  public main(): void {
    this.start_server();
  }
}

new Main();


