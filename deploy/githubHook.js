let hookshot = require('hookshot');
hookshot('refs/heads/main', 'git pull && cd ../api && yarn deploy:update && cd ../frontend && yarn deploy').listen(3333)