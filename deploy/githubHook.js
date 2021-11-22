let hookshot = require('hookshot');
hookshot('refs/heads/main', 'git pull && cd ../api && yarn deploy:update && cd ../frontend && yarn deploy:update').listen(3333)