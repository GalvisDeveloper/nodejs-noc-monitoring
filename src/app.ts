import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server"

const main = () => {
    console.log({ port: envs.PORT})
    // Server.start();
}

(async () => {
    main();
})()

