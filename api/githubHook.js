var hookshot = require('hookshot');
hookshot('refs/heads/master', 'git pull && yarn deploy:hook').listen(3333)