/*
 *     该副本基于koishi框架,仅用于娱乐目的。
 *     Copyright (C) 2023-present yun
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Affero General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Context, h, Schema} from 'koishi'

export const name = 'meme'

export interface Config {
  url: String,
  proxyUrl: String,
}

export const schema = Schema.object({
  url: Schema.string().default("https://gh.yka.moe/https://raw.githubusercontent.com/zhaoolee/ChineseBQB/master/chinesebqb_github.json"),
  proxyUrl: Schema.string().default("https://gh.yka.moe/"),
})

export async function apply(ctx: Context, config: Config) {

  const originJsonUrl = config.url.toString()
  const proxyUrl = config.proxyUrl.toString()

  let memeMap = new Map

  // 先获取json文件地址
  const originJson = await ctx.http.get(originJsonUrl).catch(() => {
    throw new Error("获取json文件失败")
  });

  // 遍历json
  originJson.data.forEach(lt => {
    // 将每个分类进行加载，好像有点多，希望不会爆内存
    let category = lt.category.replaceAll(/[^\u4e00-\u9fa5a-zA-Z]/g, "").replace(/BQB/ig, "")

    let first = category.replaceAll(/[a-zA-Z]/g, "")
    let seconds = category.replaceAll(/[\u4e00-\u9fa5]/g, "")

    category = first || seconds

    let list: String[] = memeMap.get(category)
    list ??= []
    list.push(proxyUrl + lt.url)
    memeMap.set(category, list)
  })

  // 注册主指令
  ctx.command("表情包")
    .action(async (_) => {
      // 返回个随机的就行了,没那么多有的没的
      const values = getRandomItem(memeMap)
      const url = values[Math.floor(Math.random() * values.length)]
      return h.image(url)
    })

  // 注册子指令

  // 然后将每个分类名称装载成指令
  memeMap.forEach((value, key) => {
    ctx.command("表情包/" + key)
      .action(async (_) => {
        // 对指令就行加工
        const values = memeMap.get(key)
        const url = values[Math.floor(Math.random() * values.length)]
        return h.image(url)
      })
  })
}

const getRandomItem = iterable => iterable.get([...iterable.keys()][Math.floor(Math.random() * iterable.size)])
