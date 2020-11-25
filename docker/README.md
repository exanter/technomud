# technomud::docker

In searching for some basics on converting json data into a redis data store, I came across this url:

https://redislabs.com/blog/redis-as-a-json-store/

On an initial read thru, this seems a good place to plunge into when storing json in redis.  

So now instead of running redis locally (which doesn't have this addon module), I'll use 
the docker image they so helpfully provided:

docker run -d -p 6379:6379 --name redis-rejson redislabs/rejson:latest
