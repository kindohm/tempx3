var hookshot = require('hookshot');
hookshot('refs/heads/master', 'git pull && yarn deploy:update').listen(3333)