import { Nuxt } from '@nuxt/core';
import { BundleBuilder } from '@nuxt/webpack';
import { Builder } from '@nuxt/builder';
import Consola from 'consola';
import config from '../../nuxt.config';

export default class NuxtServer {
  private static instance: NuxtServer;
  public nuxt: Nuxt;

  public async run(shouldBuild = true): Nuxt {
    const dev = process.env.NODE_ENV !== 'production';
    const nuxt: Nuxt = new Nuxt(config);
    await nuxt.ready();

    // Build only in dev mode
    if (dev && shouldBuild) {
      const builder = new Builder(nuxt, BundleBuilder);
      const res = await builder.build();

      this.nuxt = res.nuxt;

      return this.init(res.nuxt);
    }

    if (this.nuxt) {
      return this.nuxt;
    }

    return this.init(nuxt);
  }

  private init(nuxt: Nuxt): Nuxt {
    nuxt.hook('render:route', url => {
      Consola.debug(`path called ${url}`);
    });

    nuxt.hook('render:errorMiddleware', app =>
      app.use((err: any, _: any, __: any, next: any) => {
        Consola.debug(err.message, err.stack);
        next(err);
      })
    );

    return nuxt;
  }

  public static getInstance(): NuxtServer {
    if (!this.instance) {
      this.instance = new NuxtServer();
    }
    return this.instance;
  }
}
