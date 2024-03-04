## Base Application

#### API

https://github.com/qrizan/laravel-swagger-roles

#### setup .env
```
NEXT_PUBLIC_API_BACKEND = 'http://localhost:8000'
```

#### robots.txt configuration
> src/pages/api/robots.ts

``` 
check URL: http://localhost:3000/robots.txt 
```
 
#### posts sitemap.xml configuration
> src/pages/sitemap.xml.ts

``` 
check URL: http://localhost:3000/sitemap.xml
```

#### header tag

> src/components/layouts/Layout.tsx

#### domain image configuration ( backend source image )
> next.config.mjs

```
...
  images: {
    domains: ['localhost'] 
  },
...
```

#### running

> cd nextjs-tailwind-storybook

> npm i

> npm run dev

#### screenshot
![home](screenshot/home.png)

![categories](screenshot/categories.png)

![article-detail](screenshot/article-detail.png)

![home-mobile](screenshot/home-mobile.png) ![detail-mobile](screenshot/detail-mobile.png)

#### UI documentation

> npm run storybook

![article-detail](screenshot/storybook.png)