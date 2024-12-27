import modelsRouter from './models.js';
import chatRouter from './chat.js';

const mainRouter = { modelsRouter, chatRouter };

export { modelsRouter, chatRouter };
export default mainRouter;