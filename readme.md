A thing.

## Run Locally

Until things are improved, you have to start the API and frontend separately.

Start the API:

```
cd api
docker-compose up
yarn
yarn start
```

Start the frontend:

```
cd frontend
yarn start
```

## Deploy

Deployment is kicked off in the `deploy` folder, using GitHub webhooks. 

Processes on the server are managed using `pm2`. Each app (API and frontend) builds
and starts itself as a pm2 process. The deploy webhook fires each app's build/deploy scripts.

