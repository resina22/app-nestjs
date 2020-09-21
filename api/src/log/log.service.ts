import { Injectable } from '@nestjs/common'
import { Client } from '@elastic/elasticsearch'

import { Log } from './log.config'

@Injectable()
export class LogService {
  private readonly client: Client
  private readonly index = 'log'

  constructor(
  ) {
    this.client = new Client({
      node: `${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`
    })
  }

  async seachLevel(log: Log) {
    return await this.client.search({
      index: this.index,
      body: {
        query: {
          match: { level: log.level }
        }
      }
    }).then((response) => {
      const { hits } = response.body
      return hits
    }).catch((err) => {
      return err
    })
  }

  async register(log: Log) {
    const response = await this.client.index({
      index: this.index,
      body: {
        ...log
      }
    }).then((response) => {
      const {body} = response.body
      return body
    }).catch((err) => {
      return err
    })
  }
}
