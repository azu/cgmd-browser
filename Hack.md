# レンダリングを差し替える

## Electron

app/electron.js

```
const md = cgmd.render(replacedFile)
```

を好きなのMarkdownのrenderに差し替え。

## Browser

app/src/components/PreviewView.vue

- openMarkdown -> Electron -> レンダリング済みMarkdown(HTML) -> 取得
- previewにHTMLを渡す update(html)

### preview

app/src/static/webview.html

ただの静的なHTML

- update(html) でHTMLを受け取りinnerHTMLしている