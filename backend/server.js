//Package HTTP natif de Node (Pour importer le contenu d'un module JavaScript, on utilise le mot-clé require)
const http = require('http');


//On impoorte notre application Express, que nous avons créé dans app.js
const app = require('./app');

/*la normalisation de port, la gestion d'erreur et du logging basique à votre 
serveur Node le rend plus constant et plus facile à déboguer.*/
const normalizePort = val => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

//Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne 
const port = normalizePort(process.env.PORT || '3000')
//On dit à l'application Express sur quel port elle va tourner
app.set('port', port);
//Création du serveur. Fonction qui sera exécutée à chaque appel effectué vers ce serveur

//recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
    throw error;
}
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
switch (error.code) {
    case 'EACCES':
        console.error(bind + 'require elevated privileges.');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
    default:
        throw error;
}
};
//On pass notre application créé dans app.js à notre serveur
//Notre app est une fonction qui va recevoir la requéte et la repponse, qui les modifies
const server = http.createServer(app);



server.on('error', errorHandler);
//Recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listen on ' + bind);
})



/*Configuration du serveur pour qu'il ecoute :
soit la variable d'environnement du port grâce à process.env.PORT : 
si la plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera
Soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.*/
server.listen(port);
//Démarrez le serveur en exécutant "node server" navigateur pour accéder à http://localhost:3000


/*Notre serveur Node nous retourne bien l'application Express, 
qui elle nous retournera la reponse "string" quelque soit la reponse*/