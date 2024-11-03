---
datetime: 2024-09-11 20:40
tags:
  - notes
publish: true
url: contribution-to-open-webui
---
准备用 LLM 润色一下论文，但是担心论文内容被拿去训练 (咱也不知道会不会、影响有多大)，但为了数据安全就想在本地部署一个 LLM ChatBox。

看了眼 Ollama 的 Community Integrations，直接第一个推荐好眼熟点了进去。
[Open WebUI](https://github.com/open-webui/open-webui)，想起第一次看到这个项目的时候觉得：这复刻 ChatGPT 有什么特别的用途嘛？现在知道了🤡。

折腾了一番成功把它部署在了家里的群晖上，但是每次进设置中的 Connection 界面就会卡死。
![[OpenWebUI-Stuck.png|600]]
但是我在本地部署的时候没有问题啊🤔。
我开始还以为群晖上跑 Docker image 的时候参数没传对，反复对比了好久。
最后发现是因为我本地挂了🪜，群晖没有代理。
![[OpenWebUI-OpenAI-Disable.png|600]]
即使 OpenAI 的 API 关掉了，它还是会向 OpenAI 发请求获取 Models。并且这个 Query 没有设置 TimeOut，我用 VSCode 打开的时候 Pylint 都在报 Warning 了🤣。
![[OpenWebUI-pylint-warning.png|600]]

于是按照他们的 [Contributing Guide](https://docs.openwebui.com/contributing#-code-contribution-guidelines) 先交了个 Discussion
https://github.com/open-webui/open-webui/discussions/5292

接下来的一整天就等着有人回复我🤣。我的第二个 OSS PR 啊哈哈哈

但是过了一天都没人理，我就只好交 PR 了，https://github.com/open-webui/open-webui/pull/5319

没想到 Merge 的挺快的，几个小时后就给合了。

Good catch。那就是这样了，希望能给所有处在 "**an environment where I cannot access OpenAI**" 的使用者带来一些便利，少一些困扰。

That's all.

```dataview
TABLE WITHOUT ID
file.inlinks AS "Inlink files"
where file.name = this.file.name
```
```dataview
TABLE WITHOUT ID
file.outlinks AS "Outlink files"
where file.name = this.file.name
```