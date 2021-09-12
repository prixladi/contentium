**Contentium** is a project you can use for creating sites with search engine optimalized, server side rendered/generated content that is written in markdown files. The project uses [Next.js](https://nextjs.org/) as the main framework, [mdx](https://mdxjs.com/) to render markdown, [Prism.js](https://prismjs.com/) for code highlights, and [Tailwind CSS](https://tailwindcss.com/) for styles. You can find the project on [Github](https://github.com/prixladi/contentium).

Content is generated from the `./data` folder that is the root of the project. The folder contains `settings.json` file that contains the basic settings for a site.

## Settings.json

```json
{
    "metaDescription": "This is example blog of Contentium project.",
    "mainTitle": "My Example blog",
    "mainDescription": "This is example blog made by **Ladislav Prix**.",
    "ogImageExtension": "png",
    "ogUrl": "https://blog.example.com",
    "footer": "Copyright 2021 © [Ladislav Prix](mailto:contact@ladislavprix.cz)",
    "autosearchTresholdCount": "100"
}
```

1. **metaDescription** - Content of `<meta name="description">` and `<meta name="og:description">` tags on the main page.
2. **mainTitle** - `<h1>` title on main page. Also the `<title>` tag and the `<meta name="og:title">` tag of the page.
3. **mainDescription** - Main description of the page, right below title, supports **markdown**.
5. **ogUrl** - Url that will be used as content of the `<meta name="og:url">` meta tag on main page and as a base for that tag on article pages.
4. **ogImageExtension** - extension of a image in - `/public/assets/pages/home.{ogImageExtension}` - that will be used as content of the `<meta name="og:image">` tag on the main page.
6. **footer** - Footer on all pages, supports **markdown**.
7. **autosearchTresholdCount** - Threshold of number of articles after which search on main pages stops searching automatically as you type and instead of taht waits for click on search button. High treshold can cause performance issues, change with *caution*.

Then `./data` folder contains `articles` folder that includes other folders that are home to concrete articles. Each article is defined by its own `metadata.json` file. A **Markdown** file with the text itself. **Markdown** file should not contain the main heading because it is taken over from `metadata.json`. You can see the full structure of the `./data` folder in the example in the [project repo itself](https://github.com/prixladi/contentium).

## Metadata.json

```json 
{
    "title": "Contentium case study",
    "metaDescription": "Contentium is a project, build with Next.js.",
    "keywordText": "markdown",
    "ogImageExtension": "png",
    "brief": "**Contentium** is a project, build with Next.js.",
    "highlighted": true,
    "createdAt": "2021-09-09",
    "author": "Ladislav Prix",
    "readingTimeInMinutes": 5
}
```

1. **title** - Name of article in list `<h1>` title on article page and `<title>` of the article page. (*searchable*)
2. **metaDescription** - Content of the `<meta name="description">` tag on the article page.
3. **keywordText** - Content of the `<meta name="keywork">` tag on the article page. (*searchable*)
4. **ogImageExtension** - extension of the image - `/public/assets/pages/{articleFolderName}.{ogImageExtension}` - that will be used as content of the `<meta name="og:image">` tag on the article page.
5. **brief** - Brief description in article list, supports **markdown**.
6. **highlighted** - Articles with **highlighted** flag set to true are shown first in list of articles and also have special ⭐ mark at the end of their title.
7. **createdAt** - Date when article was created. Used as secondary sort after **highlighted** flag. 
8. **author** - Author of the article. (*searchable*)
9. **readingTimeInMinutes** - Estimated reading time in minutes.

## Contentium modes

**Contentium** can be used in two different modes, those can be run natively or using **Docker** image `shamyr/contentium-base` that is exposed from this project.

1. **ISR mode** - ISR mode uses **Incremental static regeneration**, this mode is best when you need to change content while the application is running. This can be done with commands `yarn build` and `yarn start`.
2. **SSG mode** - SSG mode uses **Server side generation**, this mode is best when you don't need to change content *on the fly* and statically generated pages are enough for you. 

### ISR mode

This mode requires [Node.js](https://nodejs.org/en/) as runtime because it runs **nextjs** server on the backend that performs **Incremental static regeneration**. You can start the application in this mode natively using `yarn build` and `yarn start` commands in the project root. Or you can use **Docker** image `shamyr/contentium-base` as you can see below. **ISR mode** provides healty mixture of performance, SEO and flexibility to add new content while the application is running without need to deploy new updated service.   

```docker
FROM shamyr/contentium-base as builder
RUN yarn build

FROM node:16-alpine3.11 as runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/data ./data

EXPOSE 3000
CMD ["yarn", "start"]
```

### SSG mode

This mode generates static pages that can be put to **CDN** and served from there. You can build pages natively using `yarn export`. Or you can use **Docker** image `shamyr/contentium-base` as you can see below, where we build pages and put them to [Nginx](https://www.nginx.com/) web server. **SSG mode** provides maximum performance and SEO thanks to the generated pages, but it comes with cost that you cannot add pages without need to rebuild whole app.

```docker
FROM shamyr/contentium-base as builder
RUN yarn export

FROM nginx:1.21.1-alpine

COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
```

## Conclusion

**Contentium** is suited for those who want to create fast, SEO optimalized site with static content (eg. blog). Fo example this site is created with **Contentium** 🙂.