start:
	deno run --allow-all mod.ts

dev:
	deno run --watch --allow-all mod.ts

fmt:
	deno fmt --config deno.json

lint:
	deno lint

compile:
	deno compile --allow-all mod.ts

scrape:
	deno run --allow-all utils/scrape.ts
test:
	deno test